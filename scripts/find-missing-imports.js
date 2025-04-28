/**
 * Script to find missing imports in the codebase
 * 
 * This script scans all TypeScript and JavaScript files in the src directory
 * and checks if the imported files exist.
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Get all TypeScript and JavaScript files in the src directory
const files = glob.sync('src/**/*.{ts,tsx,js,jsx}');

// Regular expression to match import statements
const importRegex = /import\s+(?:{[^}]*}|\*\s+as\s+[^;]+|[^;]+)\s+from\s+['"]([^'"]+)['"]/g;

// Store missing imports
const missingImports = [];

// Check each file
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  
  // Find all import statements in the file
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    
    // Skip node_modules and relative imports that start with @
    if (importPath.startsWith('@') || !importPath.startsWith('.')) {
      continue;
    }
    
    // Resolve the import path
    const basePath = path.dirname(file);
    let resolvedPath = path.resolve(basePath, importPath);
    
    // Check if the file exists with various extensions
    const extensions = ['.ts', '.tsx', '.js', '.jsx', ''];
    let exists = false;
    
    for (const ext of extensions) {
      if (fs.existsSync(resolvedPath + ext)) {
        exists = true;
        break;
      }
      
      // Check for index files in directories
      if (fs.existsSync(path.join(resolvedPath, 'index' + ext))) {
        exists = true;
        break;
      }
    }
    
    if (!exists) {
      missingImports.push({
        file,
        importPath,
        resolvedPath
      });
    }
  }
});

// Print the results
console.log('Missing imports:');
console.log('===============');

if (missingImports.length === 0) {
  console.log('No missing imports found!');
} else {
  missingImports.forEach(({ file, importPath, resolvedPath }) => {
    console.log(`File: ${file}`);
    console.log(`Import: ${importPath}`);
    console.log(`Resolved path: ${resolvedPath}`);
    console.log('---------------');
  });
  
  console.log(`Total missing imports: ${missingImports.length}`);
}

// Group missing imports by the missing file
const missingFiles = {};

missingImports.forEach(({ importPath, file }) => {
  if (!missingFiles[importPath]) {
    missingFiles[importPath] = [];
  }
  
  missingFiles[importPath].push(file);
});

console.log('\nMissing files:');
console.log('=============');

Object.entries(missingFiles).forEach(([importPath, files]) => {
  console.log(`Missing file: ${importPath}`);
  console.log(`Referenced in ${files.length} file(s):`);
  files.forEach(file => console.log(`  - ${file}`));
  console.log('-------------');
});
