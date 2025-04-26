#!/usr/bin/env node

/**
 * Technical Debt Analyzer
 * 
 * This script analyzes a component for technical debt issues and generates a technical debt report.
 * It looks for legacy patterns, deprecated props, performance issues, and other technical debt indicators.
 * 
 * Usage:
 *   node analyze-technical-debt.js path/to/component.tsx
 * 
 * Example:
 *   node analyze-technical-debt.js ../../src/components/ui/Button.tsx
 */

const fs = require('fs');
const path = require('path');

// Configuration
const DOCS_ROOT = path.resolve(__dirname, '..');
const TEMPLATE_PATH = path.join(__dirname, 'technical-debt-template.md');

// Parse command line arguments
const componentPath = process.argv[2];

// Validate arguments
if (!componentPath) {
  console.error('Error: Component path is required.');
  console.error('Usage: node analyze-technical-debt.js path/to/component.tsx');
  process.exit(1);
}

// Check if component file exists
if (!fs.existsSync(componentPath)) {
  console.error(`Error: Component file not found at ${componentPath}`);
  process.exit(1);
}

// Read component file
let componentContent;
try {
  componentContent = fs.readFileSync(componentPath, 'utf8');
} catch (error) {
  console.error(`Error reading component file: ${error.message}`);
  process.exit(1);
}

// Read template file
let templateContent;
try {
  templateContent = fs.readFileSync(TEMPLATE_PATH, 'utf8');
} catch (error) {
  console.error(`Error reading template file: ${error.message}`);
  process.exit(1);
}

// Extract component name from file path
const componentNameMatch = /([A-Za-z0-9]+)\.tsx$/.exec(componentPath);
const componentName = componentNameMatch ? componentNameMatch[1] : 'UnknownComponent';

console.log(`Analyzing technical debt for ${componentName}...`);

// Initialize technical debt report
let technicalDebtReport = templateContent.replace(/\[ComponentName\]/g, componentName);

// Define technical debt patterns to look for
const technicalDebtPatterns = [
  {
    category: 'Legacy Patterns',
    patterns: [
      { 
        name: 'Class Component',
        regex: /class\s+\w+\s+extends\s+React\.Component/,
        description: 'Uses class component instead of functional component with hooks',
        impact: 'Increases code complexity and makes it harder to use modern React features',
        remediation: 'Refactor to functional component with hooks',
        priority: 'Medium'
      },
      { 
        name: 'Direct DOM Manipulation',
        regex: /document\.getElementById|document\.querySelector|this\.refs/,
        description: 'Directly manipulates the DOM instead of using React refs',
        impact: 'Bypasses React\'s virtual DOM and can cause unexpected behavior',
        remediation: 'Use React refs instead of direct DOM manipulation',
        priority: 'High'
      },
      { 
        name: 'Legacy Lifecycle Methods',
        regex: /componentWillMount|componentWillReceiveProps|componentWillUpdate/,
        description: 'Uses deprecated lifecycle methods',
        impact: 'These methods will be removed in future React versions',
        remediation: 'Migrate to modern lifecycle methods or hooks',
        priority: 'High'
      },
      { 
        name: 'Inline Styles',
        regex: /style={{/,
        description: 'Uses inline styles instead of styled components or CSS modules',
        impact: 'Makes styling less maintainable and harder to override',
        remediation: 'Use styled-components or CSS modules',
        priority: 'Low'
      },
      { 
        name: 'Prop Drilling',
        regex: /props\.\w+\.\w+\.\w+/,
        description: 'Passes props through multiple levels of components',
        impact: 'Makes component hierarchy rigid and harder to refactor',
        remediation: 'Use context or state management library',
        priority: 'Medium'
      }
    ]
  },
  {
    category: 'Deprecated Props',
    patterns: [
      { 
        name: 'Deprecated React Props',
        regex: /dangerouslySetInnerHTML|ref={["']\w+["']}/,
        description: 'Uses deprecated or dangerous React props',
        impact: 'Can lead to security vulnerabilities or unexpected behavior',
        remediation: 'Use safer alternatives',
        priority: 'High'
      }
    ]
  },
  {
    category: 'Performance Issues',
    patterns: [
      { 
        name: 'Missing Memoization',
        regex: /function\s+\w+\(\)\s+{[\s\S]*?return\s+[\s\S]*?}/,
        description: 'Function component without memoization',
        impact: 'May cause unnecessary re-renders',
        remediation: 'Use React.memo for function components',
        priority: 'Medium'
      },
      { 
        name: 'Expensive Calculations in Render',
        regex: /\.map\([\s\S]*?\.map\(|\.filter\([\s\S]*?\.map\(|\.reduce\([\s\S]*?\.map\(/,
        description: 'Performs expensive calculations in render method',
        impact: 'May cause performance issues with large data sets',
        remediation: 'Use useMemo to memoize expensive calculations',
        priority: 'Medium'
      },
      { 
        name: 'Inline Function in JSX',
        regex: /onClick={(?!\s*\w+\s*)\(\)\s*=>/,
        description: 'Creates new function instances on each render',
        impact: 'May cause unnecessary re-renders of child components',
        remediation: 'Use useCallback for event handlers',
        priority: 'Low'
      }
    ]
  },
  {
    category: 'Accessibility Issues',
    patterns: [
      { 
        name: 'Missing ARIA Attributes',
        regex: /<button[^>]*?(?!aria-)/,
        description: 'Interactive elements without ARIA attributes',
        impact: 'Reduces accessibility for screen reader users',
        remediation: 'Add appropriate ARIA attributes',
        priority: 'High'
      },
      { 
        name: 'Non-semantic Elements',
        regex: /<div[^>]*?onClick|<span[^>]*?onClick/,
        description: 'Non-semantic elements with interactive handlers',
        impact: 'Reduces accessibility and semantic meaning',
        remediation: 'Use semantic elements like button, a, etc.',
        priority: 'Medium'
      }
    ]
  },
  {
    category: 'Code Quality Issues',
    patterns: [
      { 
        name: 'Magic Numbers',
        regex: /\d+(?!px|em|rem|%|vh|vw|s|ms)/,
        description: 'Uses hard-coded numbers without explanation',
        impact: 'Reduces code readability and maintainability',
        remediation: 'Extract magic numbers to named constants',
        priority: 'Low'
      },
      { 
        name: 'Long Functions',
        regex: /function\s+\w+\([^)]*\)\s*{[\s\S]{1000,}?}/,
        description: 'Function is too long (>1000 characters)',
        impact: 'Reduces code readability and maintainability',
        remediation: 'Break down into smaller functions',
        priority: 'Medium'
      },
      { 
        name: 'Complex Conditionals',
        regex: /if\s*\([^)]*&&[^)]*&&[^)]*\)/,
        description: 'Complex conditional logic with multiple conditions',
        impact: 'Reduces code readability and increases chance of errors',
        remediation: 'Extract conditions to named variables or functions',
        priority: 'Low'
      }
    ]
  }
];

// Analyze component for technical debt
let technicalDebtIssues = [];
let issueId = 1;

for (const category of technicalDebtPatterns) {
  for (const pattern of category.patterns) {
    if (pattern.regex.test(componentContent)) {
      const id = `${category.category.substring(0, 2).toUpperCase()}-${issueId.toString().padStart(3, '0')}`;
      technicalDebtIssues.push({
        id,
        category: category.category,
        pattern: pattern.name,
        description: pattern.description,
        impact: pattern.impact,
        remediation: pattern.remediation,
        priority: pattern.priority
      });
      issueId++;
    }
  }
}

// Generate technical debt report
if (technicalDebtIssues.length > 0) {
  // Update summary
  const categoryCounts = {};
  const severityCounts = { 'High': 0, 'Medium': 0, 'Low': 0 };
  
  for (const issue of technicalDebtIssues) {
    categoryCounts[issue.category] = (categoryCounts[issue.category] || 0) + 1;
    severityCounts[issue.priority]++;
  }
  
  let summaryTable = '| Category | Count | Severity | Overall Impact |\n|----------|-------|----------|----------------|\n';
  
  for (const category in categoryCounts) {
    const count = categoryCounts[category];
    const highCount = technicalDebtIssues.filter(i => i.category === category && i.priority === 'High').length;
    const mediumCount = technicalDebtIssues.filter(i => i.category === category && i.priority === 'Medium').length;
    const lowCount = technicalDebtIssues.filter(i => i.category === category && i.priority === 'Low').length;
    
    let severity = 'Low';
    if (highCount > 0) severity = 'High';
    else if (mediumCount > 0) severity = 'Medium';
    
    summaryTable += `| ${category} | ${count} | ${severity} | ${severity} |\n`;
  }
  
  let overallSeverity = 'Low';
  if (severityCounts['High'] > 0) overallSeverity = 'High';
  else if (severityCounts['Medium'] > 0) overallSeverity = 'Medium';
  
  const totalIssues = technicalDebtIssues.length;
  summaryTable += `| **Total** | **${totalIssues}** | **${overallSeverity}** | **${overallSeverity}** |`;
  
  technicalDebtReport = technicalDebtReport.replace(/\| Category \| Count \| Severity \| Overall Impact \|[\s\S]*?\| \*\*Total\*\* \| \*\*0\*\* \| \*\*Low\*\* \| \*\*Low\*\* \|/, summaryTable);
  
  // Update issue tables
  const categoryTables = {
    'Legacy Patterns': '',
    'Deprecated Props': '',
    'Required Future Optimizations': '',
    'Code Quality Issues': '',
    'Performance Issues': '',
    'Accessibility Issues': ''
  };
  
  for (const issue of technicalDebtIssues) {
    if (issue.category === 'Legacy Patterns') {
      categoryTables['Legacy Patterns'] += `| ${issue.id} | ${issue.pattern} | ${issue.description} | ${issue.impact} | ${issue.remediation} | ${issue.priority} |\n`;
    } else if (issue.category === 'Deprecated Props') {
      categoryTables['Deprecated Props'] += `| ${issue.id} | ${issue.pattern} | 1.0.0 | New API | Migrate to new API | ${issue.priority === 'High' ? 'Yes' : 'No'} |\n`;
    } else if (issue.category === 'Performance Issues') {
      categoryTables['Required Future Optimizations'] += `| ${issue.id} | Performance: ${issue.pattern} | ${issue.description} | ${issue.impact} | ${issue.priority} | ${issue.priority} |\n`;
      categoryTables['Performance Issues'] += `| ${issue.id} | ${issue.pattern} | ${issue.description} | ${issue.impact} | ${issue.remediation} | ${issue.priority} |\n`;
    } else if (issue.category === 'Code Quality Issues') {
      categoryTables['Code Quality Issues'] += `| ${issue.id} | ${issue.pattern} | ${issue.description} | ${issue.impact} | ${issue.remediation} | ${issue.priority} |\n`;
    } else if (issue.category === 'Accessibility Issues') {
      categoryTables['Accessibility Issues'] += `| ${issue.id} | ${issue.pattern} | WCAG 2.1 | ${issue.impact} | ${issue.remediation} | ${issue.priority} |\n`;
    }
  }
  
  // Replace tables in template
  if (categoryTables['Legacy Patterns']) {
    technicalDebtReport = technicalDebtReport.replace(/\| LP-001 \| \[Pattern Name\] \| \[Description of the legacy pattern\] \| \[Impact on maintainability, performance, etc\.\] \| \[Recommended remediation approach\] \| \[High\/Medium\/Low\] \|/, categoryTables['Legacy Patterns']);
  }
  
  if (categoryTables['Deprecated Props']) {
    technicalDebtReport = technicalDebtReport.replace(/\| DP-001 \| \[Prop Name\] \| \[Version\] \| \[Replacement Prop\] \| \[Migration instructions\] \| \[Yes\/No\] \|/, categoryTables['Deprecated Props']);
  }
  
  if (categoryTables['Required Future Optimizations']) {
    technicalDebtReport = technicalDebtReport.replace(/\| RFO-001 \| \[Optimization Name\] \| \[Description of the optimization\] \| \[Expected benefit\] \| \[High\/Medium\/Low\] \| \[High\/Medium\/Low\] \|/, categoryTables['Required Future Optimizations']);
  }
  
  if (categoryTables['Code Quality Issues']) {
    technicalDebtReport = technicalDebtReport.replace(/\| CQ-001 \| \[Issue Name\] \| \[Description of the code quality issue\] \| \[Impact on maintainability, readability, etc\.\] \| \[Recommended remediation approach\] \| \[High\/Medium\/Low\] \|/, categoryTables['Code Quality Issues']);
  }
  
  if (categoryTables['Performance Issues']) {
    technicalDebtReport = technicalDebtReport.replace(/\| PI-001 \| \[Issue Name\] \| \[Description of the performance issue\] \| \[Impact on user experience, resource usage, etc\.\] \| \[Recommended remediation approach\] \| \[High\/Medium\/Low\] \|/, categoryTables['Performance Issues']);
  }
  
  if (categoryTables['Accessibility Issues']) {
    technicalDebtReport = technicalDebtReport.replace(/\| AI-001 \| \[Issue Name\] \| \[WCAG criterion\] \| \[Impact on accessibility\] \| \[Recommended remediation approach\] \| \[High\/Medium\/Low\] \|/, categoryTables['Accessibility Issues']);
  }
  
  // Create technical debt roadmap
  let roadmapTable = '';
  const priorityOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
  
  const sortedIssues = [...technicalDebtIssues].sort((a, b) => {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
  
  for (const issue of sortedIssues) {
    const effort = issue.priority === 'High' ? '3-5 days' : (issue.priority === 'Medium' ? '1-3 days' : '0.5-1 day');
    const targetVersion = issue.priority === 'High' ? 'Next release' : (issue.priority === 'Medium' ? 'Next quarter' : 'Next major');
    
    roadmapTable += `| ${issue.id} | ${issue.category}: ${issue.pattern} | ${issue.priority} | ${effort} | ${targetVersion} | None |\n`;
  }
  
  if (roadmapTable) {
    technicalDebtReport = technicalDebtReport.replace(/\| \[ID\] \| \[Issue summary\] \| \[High\/Medium\/Low\] \| \[Story points or days\] \| \[Target version\] \| \[Dependencies\] \|/, roadmapTable);
  }
  
  // Create migration guide
  if (categoryTables['Deprecated Props']) {
    let migrationGuide = '';
    const deprecatedProps = technicalDebtIssues.filter(i => i.category === 'Deprecated Props');
    
    if (deprecatedProps.length > 0) {
      migrationGuide = '```jsx\n// Old usage (deprecated)\n';
      
      for (const prop of deprecatedProps) {
        migrationGuide += `<${componentName} ${prop.pattern}="value" />\n`;
      }
      
      migrationGuide += '\n// New usage (recommended)\n';
      
      for (const prop of deprecatedProps) {
        migrationGuide += `<${componentName} newProp="value" /> // Replace ${prop.pattern}\n`;
      }
      
      migrationGuide += '```';
      
      technicalDebtReport = technicalDebtReport.replace(/```jsx\n\/\/ Old usage \(deprecated\)[\s\S]*?```/, migrationGuide);
    }
  }
  
  // Add additional notes
  const additionalNotes = `This technical debt analysis was automatically generated based on static code analysis. It may not capture all technical debt issues, and some identified issues may be false positives. Please review and validate each issue before addressing it.

The component was analyzed on ${new Date().toISOString().split('T')[0]}.`;
  
  technicalDebtReport = technicalDebtReport.replace(/\[Any additional notes or context about the technical debt in this component\]/, additionalNotes);
} else {
  technicalDebtReport = technicalDebtReport.replace(/\| Category \| Count \| Severity \| Overall Impact \|[\s\S]*?\| \*\*Total\*\* \| \*\*0\*\* \| \*\*Low\*\* \| \*\*Low\*\* \|/, '| Category | Count | Severity | Overall Impact |\n|----------|-------|----------|----------------|\n| **Total** | **0** | **Low** | **Low** |');
  
  technicalDebtReport = technicalDebtReport.replace(/\[Any additional notes or context about the technical debt in this component\]/, `No technical debt issues were identified in this component based on static code analysis. This does not guarantee that the component is free of technical debt, as some issues may not be detectable through static analysis.

The component was analyzed on ${new Date().toISOString().split('T')[0]}.`);
}

// Output technical debt report
const outputPath = path.join(DOCS_ROOT, 'technical-debt', `${componentName}-technical-debt.md`);
const outputDir = path.dirname(outputPath);

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

try {
  fs.writeFileSync(outputPath, technicalDebtReport);
  console.log(`Technical debt report generated: ${outputPath}`);
  
  if (technicalDebtIssues.length > 0) {
    console.log(`\nIdentified ${technicalDebtIssues.length} technical debt issues:`);
    
    for (const issue of technicalDebtIssues) {
      console.log(`  - [${issue.priority}] ${issue.category}: ${issue.pattern}`);
    }
  } else {
    console.log('\nNo technical debt issues identified.');
  }
} catch (error) {
  console.error(`Error writing technical debt report: ${error.message}`);
  process.exit(1);
}
