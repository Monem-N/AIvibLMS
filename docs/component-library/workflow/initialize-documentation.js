#!/usr/bin/env node

/**
 * Component Documentation Initializer
 * 
 * This script initializes documentation for a component using the standardized template.
 * It creates the documentation file, updates the progress tracker, and sets up the initial structure.
 * 
 * Usage:
 *   node initialize-documentation.js ComponentName category
 * 
 * Example:
 *   node initialize-documentation.js Button ui
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const DOCS_ROOT = path.resolve(__dirname, '..');
const TEMPLATE_PATH = path.join(DOCS_ROOT, 'component-template.md');
const PROGRESS_PATH = path.join(DOCS_ROOT, 'documentation-progress.md');

// Valid categories
const VALID_CATEGORIES = ['ui', 'form', 'navigation', 'data', 'feature-specific'];

// Parse command line arguments
const componentName = process.argv[2];
const category = process.argv[3];

// Validate arguments
if (!componentName || !category) {
  console.error('Error: Component name and category are required.');
  console.error('Usage: node initialize-documentation.js ComponentName category');
  console.error(`Valid categories: ${VALID_CATEGORIES.join(', ')}`);
  process.exit(1);
}

if (!VALID_CATEGORIES.includes(category)) {
  console.error(`Error: Invalid category "${category}".`);
  console.error(`Valid categories: ${VALID_CATEGORIES.join(', ')}`);
  process.exit(1);
}

// Determine file paths
const categoryDir = path.join(DOCS_ROOT, category);
const outputPath = path.join(categoryDir, `${componentName}.md`);

// Check if documentation already exists
if (fs.existsSync(outputPath)) {
  console.error(`Error: Documentation for ${componentName} already exists at ${outputPath}`);
  process.exit(1);
}

// Create category directory if it doesn't exist
if (!fs.existsSync(categoryDir)) {
  fs.mkdirSync(categoryDir, { recursive: true });
  console.log(`Created directory: ${categoryDir}`);
}

// Read template
let templateContent;
try {
  templateContent = fs.readFileSync(TEMPLATE_PATH, 'utf8');
} catch (error) {
  console.error(`Error reading template: ${error.message}`);
  process.exit(1);
}

// Replace template placeholders
const documentationContent = templateContent
  .replace(/Component Name/g, componentName)
  .replace(/Brief description of the component and its purpose./g, `The ${componentName} component is used in the Hypatia LMS for [brief purpose].`)
  .replace(/Detailed description of the component/g, `The ${componentName} component provides functionality for [detailed purpose]. It is used in [context] and supports [key features].`);

// Write documentation file
try {
  fs.writeFileSync(outputPath, documentationContent);
  console.log(`Created documentation file: ${outputPath}`);
} catch (error) {
  console.error(`Error writing documentation file: ${error.message}`);
  process.exit(1);
}

// Update progress tracker
try {
  let progressContent = fs.readFileSync(PROGRESS_PATH, 'utf8');
  
  // Find the component in the progress tracker
  const componentRegex = new RegExp(`\\| ${componentName} \\| 🔄 Planned \\| ([^|]+) \\| ([^|]+) \\| ([^|]+) \\|`, 'g');
  const match = componentRegex.exec(progressContent);
  
  if (match) {
    // Update the status to "In Progress"
    const updatedLine = `| ${componentName} | 📝 In Progress | ${match[1]} | ${match[2]} | - |`;
    progressContent = progressContent.replace(componentRegex, updatedLine);
    
    // Update the progress summary
    const categoryCapitalized = category.charAt(0).toUpperCase() + category.slice(1) + (category === 'ui' ? ' Components' : ' Components');
    const summaryRegex = new RegExp(`\\| ${categoryCapitalized} \\| (\\d+) \\| (\\d+) \\| ([\\d.]+)% \\|`);
    const summaryMatch = summaryRegex.exec(progressContent);
    
    if (summaryMatch) {
      const total = parseInt(summaryMatch[1]);
      const documented = parseInt(summaryMatch[2]);
      const newDocumented = documented; // Stays the same as we're just changing from Planned to In Progress
      const newProgress = ((newDocumented / total) * 100).toFixed(1);
      
      const updatedSummary = `| ${categoryCapitalized} | ${total} | ${newDocumented} | ${newProgress}% |`;
      progressContent = progressContent.replace(summaryRegex, updatedSummary);
    }
    
    // Update the last updated date
    const dateRegex = /Last updated: \d{4}-\d{2}-\d{2}/;
    const today = new Date().toISOString().split('T')[0];
    progressContent = progressContent.replace(dateRegex, `Last updated: ${today}`);
    
    // Write updated progress tracker
    fs.writeFileSync(PROGRESS_PATH, progressContent);
    console.log(`Updated progress tracker: ${PROGRESS_PATH}`);
  } else {
    console.warn(`Warning: Could not find ${componentName} in progress tracker. Please update manually.`);
  }
} catch (error) {
  console.error(`Error updating progress tracker: ${error.message}`);
  console.error('Please update the progress tracker manually.');
}

// Create git branch
try {
  const branchName = `docs/${componentName.toLowerCase()}`;
  execSync(`git checkout -b ${branchName}`, { stdio: 'inherit' });
  console.log(`Created git branch: ${branchName}`);
} catch (error) {
  console.error(`Error creating git branch: ${error.message}`);
  console.error('Please create the git branch manually.');
}

// Initial commit
try {
  execSync(`git add ${outputPath}`, { stdio: 'inherit' });
  execSync(`git commit -m "docs(${componentName}): Initialize documentation"`, { stdio: 'inherit' });
  console.log(`Created initial commit for ${componentName} documentation`);
} catch (error) {
  console.error(`Error creating initial commit: ${error.message}`);
  console.error('Please commit the changes manually.');
}

console.log('\nDocumentation initialization complete!');
console.log('\nNext steps:');
console.log(`1. Edit ${outputPath} to document the component purpose and specifications`);
console.log('2. Create interactive examples with Storybook');
console.log('3. Document props and API');
console.log('4. Document accessibility considerations');
console.log('5. Create version compatibility matrix');
console.log('6. Conduct technical debt review');
console.log('7. Submit for peer review');
