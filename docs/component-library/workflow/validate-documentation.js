#!/usr/bin/env node

/**
 * Documentation Validation Script
 * 
 * This script validates component documentation against the documentation checklist.
 * It checks for completeness, formatting, and required sections.
 * 
 * Usage:
 *   node validate-documentation.js path/to/component/documentation.md
 * 
 * Example:
 *   node validate-documentation.js ../ui/Button.md
 */

const fs = require('fs');
const path = require('path');

// Configuration
const DOCS_ROOT = path.resolve(__dirname, '..');
const CHECKLIST_PATH = path.join(DOCS_ROOT, 'documentation-checklist.md');

// Parse command line arguments
const documentationPath = process.argv[2];

// Validate arguments
if (!documentationPath) {
  console.error('Error: Documentation path is required.');
  console.error('Usage: node validate-documentation.js path/to/component/documentation.md');
  process.exit(1);
}

// Check if documentation file exists
if (!fs.existsSync(documentationPath)) {
  console.error(`Error: Documentation file not found at ${documentationPath}`);
  process.exit(1);
}

// Read documentation file
let documentationContent;
try {
  documentationContent = fs.readFileSync(documentationPath, 'utf8');
} catch (error) {
  console.error(`Error reading documentation file: ${error.message}`);
  process.exit(1);
}

// Read checklist file
let checklistContent;
try {
  checklistContent = fs.readFileSync(CHECKLIST_PATH, 'utf8');
} catch (error) {
  console.error(`Error reading checklist file: ${error.message}`);
  process.exit(1);
}

// Extract component name from documentation
const componentNameMatch = /# ([A-Za-z0-9]+)/.exec(documentationContent);
const componentName = componentNameMatch ? componentNameMatch[1] : 'Unknown Component';

console.log(`Validating documentation for ${componentName}...`);

// Define validation checks
const validationChecks = [
  {
    name: 'Required Sections',
    checks: [
      { name: 'Introduction', regex: /## Introduction\n\n/, required: true },
      { name: 'Props', regex: /## Props\n\n/, required: true },
      { name: 'Features', regex: /## Features\n\n/, required: true },
      { name: 'Accessibility', regex: /## Accessibility\n\n/, required: true },
      { name: 'Usage', regex: /## Usage\n\n/, required: true },
      { name: 'Technical Debt', regex: /## Technical Debt\n\n/, required: true },
      { name: 'Version Compatibility', regex: /## Version Compatibility\n\n/, required: true },
      { name: 'Edge Cases', regex: /## Edge Cases\n\n/, required: true },
      { name: 'Implementation Details', regex: /## Implementation Details\n\n/, required: true }
    ]
  },
  {
    name: 'Basic Information',
    checks: [
      { name: 'Component name', regex: /# [A-Za-z0-9]+/, required: true },
      { name: 'Brief description', regex: /# [A-Za-z0-9]+\n\n[A-Za-z0-9]/, required: true },
      { name: 'Detailed description', regex: /## Description\n\n[A-Za-z0-9]/, required: true },
      { name: 'Import statement', regex: /```tsx\nimport { [A-Za-z0-9]+ } from /, required: true },
      { name: 'Basic usage example', regex: /<[A-Za-z0-9]+ /, required: true }
    ]
  },
  {
    name: 'Props Documentation',
    checks: [
      { name: 'Props table', regex: /\| Prop \| Type \| Default \| Required \| Description \|/, required: true },
      { name: 'Prop types', regex: /\| [a-zA-Z]+ \| [a-zA-Z\|'"]+ \|/, required: true },
      { name: 'Default values', regex: /\| [a-zA-Z]+ \| [a-zA-Z\|'"]+ \| [a-zA-Z0-9\-]+ \|/, required: true },
      { name: 'Required props', regex: /\| Yes \|/, required: false },
      { name: 'Prop descriptions', regex: /\| [a-zA-Z]+ \| [a-zA-Z\|'"]+ \| [a-zA-Z0-9\-]+ \| [a-zA-Z]+ \| [A-Za-z]/, required: true },
      { name: 'Type definitions', regex: /```tsx\ninterface [A-Za-z]+ {/, required: false }
    ]
  },
  {
    name: 'Examples',
    checks: [
      { name: 'Basic example', regex: /### Basic Example\n\n```tsx/, required: true },
      { name: 'Advanced example', regex: /### [A-Za-z]+ Example\n\n```tsx/, required: true },
      { name: 'Example with context', regex: /\<[A-Za-z]+Provider\>/, required: false },
      { name: 'Syntactically correct examples', regex: /```tsx[\s\S]*?```/, required: true }
    ]
  },
  {
    name: 'Features',
    checks: [
      { name: 'Features list', regex: /## Features\n\n[0-9]+\./, required: true }
    ]
  },
  {
    name: 'Accessibility',
    checks: [
      { name: 'Accessibility section', regex: /## Accessibility\n\n/, required: true },
      { name: 'Keyboard navigation', regex: /keyboard|focus|tab|arrow|enter|space/i, required: true },
      { name: 'Screen reader', regex: /screen reader|aria|accessible name/i, required: true },
      { name: 'ARIA attributes', regex: /aria-[a-z]+|role/i, required: true },
      { name: 'Color contrast', regex: /color|contrast|ratio/i, required: true }
    ]
  },
  {
    name: 'Edge Cases',
    checks: [
      { name: 'Edge cases section', regex: /## Edge Cases\n\n/, required: true },
      { name: 'Edge case descriptions', regex: /- \*\*[A-Za-z ]+\*\*: /, required: true }
    ]
  },
  {
    name: 'Implementation Details',
    checks: [
      { name: 'Implementation section', regex: /## Implementation Details\n\n/, required: true },
      { name: 'Code example', regex: /```tsx[\s\S]*?```/, required: true }
    ]
  },
  {
    name: 'Related Components',
    checks: [
      { name: 'Related components section', regex: /## Related Components\n\n/, required: true },
      { name: 'Component links', regex: /\[([A-Za-z0-9]+)\]\(\.\/\1\.md\)/, required: true }
    ]
  },
  {
    name: 'Interactive Examples',
    checks: [
      { name: 'Storybook link', regex: /\[Storybook\]\(http/, required: true }
    ]
  },
  {
    name: 'Formatting and Style',
    checks: [
      { name: 'Markdown formatting', regex: /# [A-Za-z0-9]+\n\n/, required: true },
      { name: 'Code blocks with language tags', regex: /```tsx/, required: true },
      { name: 'Properly formatted tables', regex: /\|[\s\S]*?\|[\s\S]*?\|/, required: true },
      { name: 'Appropriate heading levels', regex: /## [A-Za-z0-9 ]+\n\n/, required: true }
    ]
  }
];

// Perform validation
let totalChecks = 0;
let passedChecks = 0;
let failedChecks = [];

console.log('\nValidation Results:');
console.log('===================\n');

for (const section of validationChecks) {
  console.log(`${section.name}:`);
  
  for (const check of section.checks) {
    totalChecks++;
    const passed = check.regex.test(documentationContent);
    
    if (passed) {
      passedChecks++;
      console.log(`  ✅ ${check.name}`);
    } else if (check.required) {
      failedChecks.push({ section: section.name, check: check.name });
      console.log(`  ❌ ${check.name} (REQUIRED)`);
    } else {
      console.log(`  ⚠️ ${check.name} (OPTIONAL)`);
    }
  }
  
  console.log('');
}

// Calculate score
const score = Math.round((passedChecks / totalChecks) * 100);

console.log('Summary:');
console.log(`  Passed: ${passedChecks}/${totalChecks} checks (${score}%)`);

if (failedChecks.length > 0) {
  console.log('\nRequired checks that failed:');
  
  for (const failure of failedChecks) {
    console.log(`  - ${failure.section}: ${failure.check}`);
  }
  
  console.log('\nPlease fix these issues before submitting for review.');
  process.exit(1);
} else {
  console.log('\nAll required checks passed!');
  
  if (score < 100) {
    console.log('Consider addressing optional checks to improve documentation quality.');
  }
}

// Additional content checks
console.log('\nAdditional Content Checks:');

// Check for placeholder text
const placeholderRegex = /\[.*?\]/g;
const placeholders = documentationContent.match(placeholderRegex) || [];

if (placeholders.length > 0) {
  console.log('  ⚠️ Placeholder text detected:');
  
  for (const placeholder of placeholders) {
    console.log(`    - ${placeholder}`);
  }
} else {
  console.log('  ✅ No placeholder text detected');
}

// Check for code examples
const codeExamples = (documentationContent.match(/```tsx[\s\S]*?```/g) || []).length;
console.log(`  ${codeExamples >= 3 ? '✅' : '⚠️'} ${codeExamples} code examples found (recommended: at least 3)`);

// Check for props documentation
const propsTable = documentationContent.match(/\| Prop \| Type \| Default \| Required \| Description \|[\s\S]*?\n\n/);
const propsCount = propsTable ? (propsTable[0].match(/\n\|/g) || []).length - 1 : 0;
console.log(`  ${propsCount > 0 ? '✅' : '⚠️'} ${propsCount} props documented`);

// Check for accessibility documentation length
const accessibilityMatch = documentationContent.match(/## Accessibility\n\n[\s\S]*?\n\n##/);
const accessibilityLength = accessibilityMatch ? accessibilityMatch[0].length : 0;
console.log(`  ${accessibilityLength > 200 ? '✅' : '⚠️'} Accessibility documentation length: ${accessibilityLength} characters (recommended: at least 200)`);

// Check for technical debt documentation
const technicalDebtMatch = documentationContent.match(/## Technical Debt\n\n[\s\S]*?\n\n##/);
console.log(`  ${technicalDebtMatch ? '✅' : '⚠️'} Technical debt documentation ${technicalDebtMatch ? 'found' : 'not found'}`);

// Check for version compatibility matrix
const versionMatrixMatch = documentationContent.match(/## Version Compatibility\n\n[\s\S]*?\n\n##/);
console.log(`  ${versionMatrixMatch ? '✅' : '⚠️'} Version compatibility matrix ${versionMatrixMatch ? 'found' : 'not found'}`);

console.log('\nValidation complete!');
