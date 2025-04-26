#!/usr/bin/env node

/**
 * Documentation Progress Tracker Updater
 * 
 * This script updates the documentation progress tracker with the current status of a component.
 * It can update the status, assigned owner, due date, and review status.
 * 
 * Usage:
 *   node update-progress.js ComponentName status [options]
 * 
 * Example:
 *   node update-progress.js Button "📝 In Progress" --owner="John Doe" --due="2023-09-15" --review="In Review"
 *   node update-progress.js Button "✅ Complete"
 */

const fs = require('fs');
const path = require('path');

// Configuration
const DOCS_ROOT = path.resolve(__dirname, '..');
const PROGRESS_PATH = path.join(DOCS_ROOT, 'documentation-progress.md');

// Valid statuses
const VALID_STATUSES = [
  '🔄 Planned',
  '📝 In Progress',
  '👀 In Review',
  '✅ Complete',
  '❌ Blocked'
];

// Parse command line arguments
const componentName = process.argv[2];
const status = process.argv[3];

// Parse options
const options = {};
for (let i = 4; i < process.argv.length; i++) {
  const arg = process.argv[i];
  if (arg.startsWith('--')) {
    const [key, value] = arg.substring(2).split('=');
    options[key] = value;
  }
}

// Validate arguments
if (!componentName || !status) {
  console.error('Error: Component name and status are required.');
  console.error('Usage: node update-progress.js ComponentName status [options]');
  console.error(`Valid statuses: ${VALID_STATUSES.join(', ')}`);
  process.exit(1);
}

if (!VALID_STATUSES.includes(status)) {
  console.error(`Error: Invalid status "${status}".`);
  console.error(`Valid statuses: ${VALID_STATUSES.join(', ')}`);
  process.exit(1);
}

// Read progress tracker
let progressContent;
try {
  progressContent = fs.readFileSync(PROGRESS_PATH, 'utf8');
} catch (error) {
  console.error(`Error reading progress tracker: ${error.message}`);
  process.exit(1);
}

// Find the component in the progress tracker
const componentRegex = new RegExp(`\\| ${componentName} \\| [^|]+ \\| ([^|]+) \\| ([^|]+) \\| ([^|]+) \\|`, 'g');
const match = componentRegex.exec(progressContent);

if (!match) {
  console.error(`Error: Component ${componentName} not found in progress tracker.`);
  process.exit(1);
}

// Extract current values
const currentOwner = match[1].trim();
const currentDueDate = match[2].trim();
const currentReviewStatus = match[3].trim();

// Determine new values
const newOwner = options.owner || currentOwner;
const newDueDate = options.due || currentDueDate;
const newReviewStatus = options.review || currentReviewStatus;

// Create updated line
const updatedLine = `| ${componentName} | ${status} | ${newOwner} | ${newDueDate} | ${newReviewStatus} |`;

// Update the progress tracker
progressContent = progressContent.replace(componentRegex, updatedLine);

// Find the category for the component
let category = '';
const categoryRegexes = [
  { name: 'UI Components', regex: new RegExp(`### UI Components[\\s\\S]*?${componentName}[\\s\\S]*?###`, 'g') },
  { name: 'Form Components', regex: new RegExp(`### Form Components[\\s\\S]*?${componentName}[\\s\\S]*?###`, 'g') },
  { name: 'Navigation Components', regex: new RegExp(`### Navigation Components[\\s\\S]*?${componentName}[\\s\\S]*?###`, 'g') },
  { name: 'Data Components', regex: new RegExp(`### Data Components[\\s\\S]*?${componentName}[\\s\\S]*?###`, 'g') },
  { name: 'Feature-Specific Components', regex: new RegExp(`### Feature-Specific Components[\\s\\S]*?${componentName}[\\s\\S]*?###`, 'g') }
];

for (const { name, regex } of categoryRegexes) {
  if (regex.test(progressContent)) {
    category = name;
    break;
  }
}

if (!category) {
  console.warn(`Warning: Could not determine category for ${componentName}. Progress summary will not be updated.`);
} else {
  // Update the progress summary
  const summaryRegex = new RegExp(`\\| ${category} \\| (\\d+) \\| (\\d+) \\| ([\\d.]+)% \\|`);
  const summaryMatch = summaryRegex.exec(progressContent);
  
  if (summaryMatch) {
    const total = parseInt(summaryMatch[1]);
    const currentDocumented = parseInt(summaryMatch[2]);
    
    // Calculate new documented count
    let newDocumented = currentDocumented;
    if (status === '✅ Complete' && match[0].indexOf('✅ Complete') === -1) {
      newDocumented += 1;
    } else if (status !== '✅ Complete' && match[0].indexOf('✅ Complete') !== -1) {
      newDocumented -= 1;
    }
    
    const newProgress = ((newDocumented / total) * 100).toFixed(1);
    
    const updatedSummary = `| ${category} | ${total} | ${newDocumented} | ${newProgress}% |`;
    progressContent = progressContent.replace(summaryRegex, updatedSummary);
    
    // Update total summary
    const totalRegex = /\| \*\*Total\*\* \| \*\*(\d+)\*\* \| \*\*(\d+)\*\* \| \*\*([\d.]+)%\*\* \|/;
    const totalMatch = totalRegex.exec(progressContent);
    
    if (totalMatch) {
      const totalComponents = parseInt(totalMatch[1]);
      const totalDocumented = parseInt(totalMatch[2]);
      
      // Calculate new total documented count
      let newTotalDocumented = totalDocumented;
      if (status === '✅ Complete' && match[0].indexOf('✅ Complete') === -1) {
        newTotalDocumented += 1;
      } else if (status !== '✅ Complete' && match[0].indexOf('✅ Complete') !== -1) {
        newTotalDocumented -= 1;
      }
      
      const newTotalProgress = ((newTotalDocumented / totalComponents) * 100).toFixed(1);
      
      const updatedTotalSummary = `| **Total** | **${totalComponents}** | **${newTotalDocumented}** | **${newTotalProgress}%** |`;
      progressContent = progressContent.replace(totalRegex, updatedTotalSummary);
    }
  }
}

// Update the last updated date
const dateRegex = /Last updated: \d{4}-\d{2}-\d{2}/;
const today = new Date().toISOString().split('T')[0];
progressContent = progressContent.replace(dateRegex, `Last updated: ${today}`);

// Add weekly progress update if status is "Complete"
if (status === '✅ Complete') {
  const weeklyUpdateRegex = /## Weekly Progress Updates\n\n### Week of [^\n]+\n\n/;
  const weekStart = getWeekStartDate();
  const weekEnd = getWeekEndDate();
  const weekRange = `${weekStart} - ${weekEnd}`;
  
  const weeklyUpdateMatch = weeklyUpdateRegex.exec(progressContent);
  
  if (weeklyUpdateMatch) {
    const currentWeekUpdate = weeklyUpdateMatch[0];
    const currentWeekRegex = /### Week of ([^\n]+)\n\n/;
    const currentWeekMatch = currentWeekRegex.exec(currentWeekUpdate);
    
    if (currentWeekMatch && currentWeekMatch[1] === weekRange) {
      // Add to current week's updates
      const updatedWeeklyUpdate = currentWeekUpdate + `- Completed documentation for ${componentName} component\n`;
      progressContent = progressContent.replace(currentWeekUpdate, updatedWeeklyUpdate);
    } else {
      // Create new week entry
      const newWeeklyUpdate = `## Weekly Progress Updates\n\n### Week of ${weekRange}\n\n- Completed documentation for ${componentName} component\n\n${currentWeekUpdate.substring(21)}`;
      progressContent = progressContent.replace(weeklyUpdateRegex, newWeeklyUpdate);
    }
  }
}

// Write updated progress tracker
try {
  fs.writeFileSync(PROGRESS_PATH, progressContent);
  console.log(`Updated progress tracker for ${componentName}: ${status}`);
  
  if (options.owner) {
    console.log(`  Owner: ${options.owner}`);
  }
  
  if (options.due) {
    console.log(`  Due Date: ${options.due}`);
  }
  
  if (options.review) {
    console.log(`  Review Status: ${options.review}`);
  }
} catch (error) {
  console.error(`Error writing progress tracker: ${error.message}`);
  process.exit(1);
}

// Helper functions
function getWeekStartDate() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  const monday = new Date(now.setDate(diff));
  return monday.toISOString().split('T')[0];
}

function getWeekEndDate() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const diff = now.getDate() - day + (day === 0 ? 0 : 5); // Adjust when day is Sunday
  const friday = new Date(now.setDate(diff));
  return friday.toISOString().split('T')[0];
}
