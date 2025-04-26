/**
 * Component Audit Script
 * 
 * This script scans the src directory to identify and categorize React components.
 * It generates a JSON file with component information that can be used for documentation.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const SRC_DIR = path.resolve(__dirname, '../src');
const OUTPUT_FILE = path.resolve(__dirname, '../docs/component-inventory.json');
const COMPONENT_EXTENSIONS = ['.tsx', '.jsx'];
const IGNORE_PATTERNS = [
  '**/__tests__/**',
  '**/*.test.tsx',
  '**/*.test.jsx',
  '**/*.spec.tsx',
  '**/*.spec.jsx',
  '**/node_modules/**'
];

// Component categories
const CATEGORIES = {
  UI: ['Button', 'Card', 'Modal', 'Alert', 'Badge', 'Tooltip', 'Tabs', 'Accordion'],
  FORM: ['Input', 'Select', 'Checkbox', 'Radio', 'Form', 'DatePicker', 'FileUpload', 'Validation'],
  NAVIGATION: ['Menu', 'Breadcrumb', 'Pagination', 'Sidebar', 'Navbar', 'Link'],
  DATA_DISPLAY: ['Table', 'List', 'Chart', 'Timeline', 'Progress', 'Avatar'],
  LAYOUT: ['Container', 'Grid', 'Row', 'Column', 'Flex', 'Box', 'Divider'],
  FEEDBACK: ['Spinner', 'Skeleton', 'ProgressBar', 'Toast', 'Notification'],
  FEATURE: ['Grading', 'Course', 'Activity', 'Submission', 'Dashboard', 'Authentication']
};

/**
 * Determines the category of a component based on its name and content
 * @param {string} componentName - The name of the component
 * @param {string} filePath - The path to the component file
 * @param {string} fileContent - The content of the component file
 * @returns {string} - The category of the component
 */
function determineCategory(componentName, filePath, fileContent) {
  // Check if component name matches any category patterns
  for (const [category, patterns] of Object.entries(CATEGORIES)) {
    if (patterns.some(pattern => 
      componentName.includes(pattern) || 
      componentName.endsWith(pattern) || 
      componentName.startsWith(pattern)
    )) {
      return category;
    }
  }

  // Check file path for clues
  if (filePath.includes('/components/ui/')) return 'UI';
  if (filePath.includes('/components/form/')) return 'FORM';
  if (filePath.includes('/components/navigation/')) return 'NAVIGATION';
  if (filePath.includes('/components/data/')) return 'DATA_DISPLAY';
  if (filePath.includes('/components/layout/')) return 'LAYOUT';
  if (filePath.includes('/components/feedback/')) return 'FEEDBACK';
  
  // Check for feature-specific components
  if (filePath.includes('/components/grading/')) return 'FEATURE';
  if (filePath.includes('/components/course/')) return 'FEATURE';
  if (filePath.includes('/components/activity/')) return 'FEATURE';
  if (filePath.includes('/components/dashboard/')) return 'FEATURE';
  if (filePath.includes('/components/auth/')) return 'FEATURE';

  // Default category
  return 'UNCATEGORIZED';
}

/**
 * Extracts props information from component file content
 * @param {string} fileContent - The content of the component file
 * @returns {Array} - Array of prop objects with name, type, and description
 */
function extractProps(fileContent) {
  const props = [];
  
  // Look for interface or type definition for props
  const propsRegex = /interface\s+(\w+Props)\s*{([^}]*)}/g;
  const typeRegex = /type\s+(\w+Props)\s*=\s*{([^}]*)}/g;
  
  let match;
  while ((match = propsRegex.exec(fileContent)) !== null || (match = typeRegex.exec(fileContent)) !== null) {
    const propsContent = match[2];
    
    // Extract individual props
    const propLines = propsContent.split('\n');
    for (const line of propLines) {
      // Skip empty lines
      if (!line.trim()) continue;
      
      // Extract prop name, type, and description
      const propMatch = line.match(/\s*(\w+)(\?)?:\s*([^;/]*);?\s*(?:\/\/\s*(.*))?/);
      if (propMatch) {
        const [, name, optional, type, description] = propMatch;
        props.push({
          name,
          type: type.trim(),
          optional: !!optional,
          description: description ? description.trim() : ''
        });
      }
    }
  }
  
  return props;
}

/**
 * Extracts JSDoc comments from component file content
 * @param {string} fileContent - The content of the component file
 * @returns {Object} - Object with component description and example
 */
function extractJSDoc(fileContent) {
  const result = {
    description: '',
    example: ''
  };
  
  // Look for JSDoc comment before component definition
  const jsDocRegex = /\/\*\*\s*([\s\S]*?)\s*\*\/\s*(?:export\s+(?:default\s+)?(?:function|const)\s+\w+|class\s+\w+)/g;
  const match = jsDocRegex.exec(fileContent);
  
  if (match) {
    const jsDoc = match[1];
    
    // Extract description
    const descriptionMatch = jsDoc.match(/@description\s+(.*?)(?=@|\*\/|$)/s);
    if (descriptionMatch) {
      result.description = descriptionMatch[1].replace(/\s*\*\s*/g, ' ').trim();
    } else {
      // If no @description tag, use the first paragraph
      const firstParagraph = jsDoc.split(/\s*\*\s*@/)[0];
      result.description = firstParagraph.replace(/\s*\*\s*/g, ' ').trim();
    }
    
    // Extract example
    const exampleMatch = jsDoc.match(/@example\s+(.*?)(?=@|\*\/|$)/s);
    if (exampleMatch) {
      result.example = exampleMatch[1].replace(/\s*\*\s*/g, '\n').trim();
    }
  }
  
  return result;
}

/**
 * Finds all component files in the source directory
 * @returns {Array} - Array of file paths
 */
function findComponentFiles() {
  const ignorePattern = IGNORE_PATTERNS.map(pattern => `--not-path "${pattern}"`).join(' ');
  const extensionPattern = COMPONENT_EXTENSIONS.map(ext => `--path "*${ext}"`).join(' ');
  
  const command = `find ${SRC_DIR} ${extensionPattern} ${ignorePattern}`;
  
  try {
    const result = execSync(command, { encoding: 'utf8' });
    return result.split('\n').filter(Boolean);
  } catch (error) {
    console.error('Error finding component files:', error);
    return [];
  }
}

/**
 * Determines if a file contains a React component
 * @param {string} filePath - The path to the file
 * @param {string} fileContent - The content of the file
 * @returns {boolean} - Whether the file contains a React component
 */
function isReactComponent(filePath, fileContent) {
  // Check for React import
  if (!fileContent.includes('import React') && !fileContent.includes('from "react"') && !fileContent.includes("from 'react'")) {
    return false;
  }
  
  // Check for component patterns
  const functionComponentPattern = /(?:export\s+(?:default\s+)?function\s+(\w+)|export\s+const\s+(\w+)\s*=\s*(?:\(\s*(?:{[^}]*}|\w+)(?:\s*:\s*\w+)?)?)/;
  const classComponentPattern = /class\s+(\w+)\s+extends\s+(?:React\.)?Component/;
  
  return functionComponentPattern.test(fileContent) || classComponentPattern.test(fileContent);
}

/**
 * Extracts the component name from a file
 * @param {string} filePath - The path to the file
 * @param {string} fileContent - The content of the file
 * @returns {string|null} - The component name or null if not found
 */
function extractComponentName(filePath, fileContent) {
  // Try to extract from function component pattern
  const functionMatch = fileContent.match(/export\s+(?:default\s+)?function\s+(\w+)|export\s+const\s+(\w+)\s*=\s*(?:\(\s*(?:{[^}]*}|\w+)(?:\s*:\s*\w+)?)?)/);
  if (functionMatch) {
    return functionMatch[1] || functionMatch[2];
  }
  
  // Try to extract from class component pattern
  const classMatch = fileContent.match(/class\s+(\w+)\s+extends\s+(?:React\.)?Component/);
  if (classMatch) {
    return classMatch[1];
  }
  
  // Fall back to file name
  const fileName = path.basename(filePath, path.extname(filePath));
  return fileName;
}

/**
 * Main function to audit components
 */
async function auditComponents() {
  console.log('Starting component audit...');
  
  const componentFiles = findComponentFiles();
  console.log(`Found ${componentFiles.length} potential component files.`);
  
  const components = [];
  
  for (const filePath of componentFiles) {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      if (!isReactComponent(filePath, fileContent)) {
        continue;
      }
      
      const componentName = extractComponentName(filePath, fileContent);
      if (!componentName) {
        continue;
      }
      
      const relativePath = path.relative(SRC_DIR, filePath);
      const category = determineCategory(componentName, filePath, fileContent);
      const { description, example } = extractJSDoc(fileContent);
      const props = extractProps(fileContent);
      
      components.push({
        name: componentName,
        path: relativePath,
        category,
        description,
        example,
        props,
        lastModified: fs.statSync(filePath).mtime.toISOString()
      });
      
      console.log(`Processed component: ${componentName} (${category})`);
    } catch (error) {
      console.error(`Error processing file ${filePath}:`, error);
    }
  }
  
  // Group components by category
  const categorizedComponents = {};
  for (const component of components) {
    if (!categorizedComponents[component.category]) {
      categorizedComponents[component.category] = [];
    }
    categorizedComponents[component.category].push(component);
  }
  
  // Sort components within each category by name
  for (const category in categorizedComponents) {
    categorizedComponents[category].sort((a, b) => a.name.localeCompare(b.name));
  }
  
  // Create output directory if it doesn't exist
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Write results to file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify({
    generatedAt: new Date().toISOString(),
    totalComponents: components.length,
    categories: Object.keys(categorizedComponents).map(category => ({
      name: category,
      count: categorizedComponents[category].length
    })),
    components: categorizedComponents
  }, null, 2));
  
  console.log(`Component audit complete. Found ${components.length} components.`);
  console.log(`Results written to ${OUTPUT_FILE}`);
}

// Run the audit
auditComponents();
