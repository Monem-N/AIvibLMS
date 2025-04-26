#!/usr/bin/env node

/**
 * Component Inventory Generator
 *
 * This script analyzes the React components in the codebase and generates
 * an inventory with information about each component, including:
 * - Component type (class or functional)
 * - jQuery usage
 * - Complexity (based on lines of code and nesting)
 * - File path
 * - Last modified date
 *
 * The inventory is saved as a JSON file and a Markdown report.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const SRC_DIR = path.resolve(__dirname, '../../src');
const COMPONENT_EXTENSIONS = ['.jsx', '.tsx', '.js', '.ts'];
const OUTPUT_DIR = path.resolve(__dirname, '../../docs/technical-debt');
const INVENTORY_JSON = path.join(OUTPUT_DIR, 'component-inventory.json');
const INVENTORY_MD = path.join(OUTPUT_DIR, 'component-inventory.md');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Find all component files in the source directory
 */
function findComponentFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findComponentFiles(filePath, fileList);
    } else if (COMPONENT_EXTENSIONS.includes(path.extname(file))) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Analyze a component file to determine its type and characteristics
 */
function analyzeComponent(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(SRC_DIR, filePath);
  const fileName = path.basename(filePath);
  const componentName = fileName.split('.')[0];

  // Determine if it's a class or functional component
  const isClassComponent = content.includes('extends React.Component') ||
                           content.includes('extends Component');

  // Check for jQuery usage with more accurate detection
  // Look for actual jQuery usage patterns rather than just the presence of '$'
  const hasJQuery =
    // Look for jQuery import statements
    /import\s+(\$|jQuery)/i.test(content) ||
    /require\s*\(\s*['"]jquery['"]\s*\)/i.test(content) ||
    // Look for jQuery usage patterns
    /\$\s*\(/.test(content) || // $(selector)
    /jQuery\s*\(/.test(content) || // jQuery(selector)
    /\.\s*ajax\s*\(/.test(content) || // $.ajax or jQuery.ajax
    /\$\.(get|post|ajax|getJSON)/i.test(content) || // $.get, $.post, etc.
    /jQuery\.(get|post|ajax|getJSON)/i.test(content);

  // Calculate complexity (simple heuristic based on lines and nesting)
  const lines = content.split('\n').length;
  const nestingLevel = Math.max(
    (content.match(/{/g) || []).length - (content.match(/}/g) || []).length,
    0
  );

  let complexity = 'Low';
  if (lines > 200 || nestingLevel > 5) {
    complexity = 'High';
  } else if (lines > 100 || nestingLevel > 3) {
    complexity = 'Medium';
  }

  // Get last modified date
  const lastModified = new Date(fs.statSync(filePath).mtime).toISOString().split('T')[0];

  // Determine modernization priority
  let priority = 'Low';
  if (isClassComponent && hasJQuery && complexity === 'High') {
    priority = 'High';
  } else if (isClassComponent && (hasJQuery || complexity === 'High')) {
    priority = 'Medium';
  }

  // Determine modernization status
  const status = isClassComponent ? 'Not Started' : 'Completed';

  return {
    name: componentName,
    path: relativePath,
    type: isClassComponent ? 'Class' : 'Functional',
    hasJQuery,
    complexity,
    lines,
    lastModified,
    priority,
    status
  };
}

/**
 * Generate a Markdown report from the component inventory
 */
function generateMarkdownReport(inventory) {
  const totalComponents = inventory.length;
  const classComponents = inventory.filter(c => c.type === 'Class').length;
  const functionalComponents = inventory.filter(c => c.type === 'Functional').length;
  const jQueryComponents = inventory.filter(c => c.hasJQuery).length;

  const classPercentage = Math.round((classComponents / totalComponents) * 100);
  const functionalPercentage = Math.round((functionalComponents / totalComponents) * 100);
  const jQueryPercentage = Math.round((jQueryComponents / totalComponents) * 100);

  let markdown = `# Component Inventory\n\n`;

  markdown += `## Summary\n\n`;
  markdown += `- **Total Components**: ${totalComponents}\n`;
  markdown += `- **Class Components**: ${classComponents} (${classPercentage}%)\n`;
  markdown += `- **Functional Components**: ${functionalComponents} (${functionalPercentage}%)\n`;
  markdown += `- **Components with jQuery**: ${jQueryComponents} (${jQueryPercentage}%)\n\n`;

  markdown += `## Modernization Progress\n\n`;
  markdown += `\`\`\`\n`;
  // Ensure percentages don't exceed 100% for visualization
  const normalizedFunctionalPercentage = Math.min(functionalPercentage, 100);
  const normalizedJQueryRemovalPercentage = Math.min(100 - jQueryPercentage, 100);

  // Calculate filled and empty bar segments, ensuring non-negative values
  const functionalFilled = Math.floor(normalizedFunctionalPercentage / 5);
  const functionalEmpty = Math.max(0, 20 - functionalFilled);

  const jQueryRemovalFilled = Math.floor(normalizedJQueryRemovalPercentage / 5);
  const jQueryRemovalEmpty = Math.max(0, 20 - jQueryRemovalFilled);

  markdown += `Functional Components: ${functionalPercentage}% [${Array(functionalFilled).fill('█').join('')}${Array(functionalEmpty).fill('░').join('')}]\n`;
  markdown += `jQuery Removal: ${100 - jQueryPercentage}% [${Array(jQueryRemovalFilled).fill('█').join('')}${Array(jQueryRemovalEmpty).fill('░').join('')}]\n`;
  markdown += `\`\`\`\n\n`;

  markdown += `## Components by Priority\n\n`;
  markdown += `| Priority | Count | Percentage |\n`;
  markdown += `|----------|-------|------------|\n`;

  const highPriority = inventory.filter(c => c.priority === 'High').length;
  const mediumPriority = inventory.filter(c => c.priority === 'Medium').length;
  const lowPriority = inventory.filter(c => c.priority === 'Low').length;

  markdown += `| High | ${highPriority} | ${Math.round((highPriority / totalComponents) * 100)}% |\n`;
  markdown += `| Medium | ${mediumPriority} | ${Math.round((mediumPriority / totalComponents) * 100)}% |\n`;
  markdown += `| Low | ${lowPriority} | ${Math.round((lowPriority / totalComponents) * 100)}% |\n\n`;

  markdown += `## Component List\n\n`;
  markdown += `| Component | Type | jQuery | Complexity | Priority | Status |\n`;
  markdown += `|-----------|------|--------|------------|----------|--------|\n`;

  // Sort by priority (High, Medium, Low)
  const sortedInventory = [...inventory].sort((a, b) => {
    const priorityOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  sortedInventory.forEach(component => {
    markdown += `| ${component.name} | ${component.type} | ${component.hasJQuery ? 'Yes' : 'No'} | ${component.complexity} | ${component.priority} | ${component.status} |\n`;
  });

  return markdown;
}

/**
 * Main function to generate the component inventory
 */
function generateInventory() {
  console.log('Generating component inventory...');

  // Find all component files
  const componentFiles = findComponentFiles(SRC_DIR);
  console.log(`Found ${componentFiles.length} component files.`);

  // Analyze each component
  const inventory = componentFiles.map(analyzeComponent);
  console.log(`Analyzed ${inventory.length} components.`);

  // Save inventory as JSON
  fs.writeFileSync(INVENTORY_JSON, JSON.stringify(inventory, null, 2));
  console.log(`Saved inventory to ${INVENTORY_JSON}`);

  // Generate and save Markdown report
  const markdown = generateMarkdownReport(inventory);
  fs.writeFileSync(INVENTORY_MD, markdown);
  console.log(`Saved Markdown report to ${INVENTORY_MD}`);

  console.log('Component inventory generation complete!');
}

// Run the inventory generator
generateInventory();
