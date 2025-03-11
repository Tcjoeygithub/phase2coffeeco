const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const stat = promisify(fs.stat);

// Function to recursively get all HTML files
async function getHtmlFiles(dir) {
  const files = await readdir(dir);
  const htmlFiles = [];

  for (const file of files) {
    if (file === 'node_modules' || file.startsWith('.')) continue;
    
    const filePath = path.join(dir, file);
    const stats = await stat(filePath);
    
    if (stats.isDirectory()) {
      const subDirFiles = await getHtmlFiles(filePath);
      htmlFiles.push(...subDirFiles);
    } else if (file.endsWith('.html')) {
      htmlFiles.push(filePath);
    }
  }
  
  return htmlFiles;
}

// Function to update links in HTML files
async function updateLinks(filePath) {
  console.log(`Processing ${filePath}...`);
  let content = await readFile(filePath, 'utf8');
  
  // Replace internal links to remove .html extension
  // This regex matches href attributes pointing to .html files but not external URLs
  content = content.replace(/href="([^"]*?)(\.html)"/g, (match, p1, p2) => {
    // Don't modify external links or form actions
    if (p1.includes('://') || p1.includes('submit-form.com')) {
      return match;
    }
    return `href="${p1}"`;
  });
  
  // Update form redirects to thank-you page
  content = content.replace(/value="(https:\/\/phase2coffeeco\.vercel\.app\/thank-you\.html)"/g, 
    'value="https://phase2coffeeco.vercel.app/thank-you"');
  
  await writeFile(filePath, content, 'utf8');
  console.log(`Updated ${filePath}`);
}

// Main function
async function main() {
  try {
    const htmlFiles = await getHtmlFiles(process.cwd());
    console.log(`Found ${htmlFiles.length} HTML files to process`);
    
    for (const file of htmlFiles) {
      await updateLinks(file);
    }
    
    console.log('All files processed successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

main(); 