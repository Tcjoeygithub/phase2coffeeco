const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const stat = promisify(fs.stat);

// Google Analytics tag to add
const googleAnalyticsTag = `
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-J2MMHTH914"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-J2MMHTH914');
</script>
`;

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

// Function to add Google Analytics tag to HTML files
async function addGoogleAnalytics(filePath) {
  console.log(`Processing ${filePath}...`);
  let content = await readFile(filePath, 'utf8');
  
  // Check if the Google Analytics tag is already present
  if (content.includes('G-J2MMHTH914')) {
    console.log(`Google Analytics tag already exists in ${filePath}`);
    return;
  }
  
  // Add the Google Analytics tag after the <head> tag
  content = content.replace('<head>', '<head>' + googleAnalyticsTag);
  
  await writeFile(filePath, content, 'utf8');
  console.log(`Added Google Analytics tag to ${filePath}`);
}

// Main function
async function main() {
  try {
    const htmlFiles = await getHtmlFiles(process.cwd());
    console.log(`Found ${htmlFiles.length} HTML files to process`);
    
    for (const file of htmlFiles) {
      await addGoogleAnalytics(file);
    }
    
    console.log('All files processed successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

main(); 