import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WIKI_DIR = path.join(__dirname, 'wiki');
const OUTPUT_FILE = path.join(__dirname, 'wiki_knowledge_base.md');

function getAllMarkdownFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllMarkdownFiles(fullPath, arrayOfFiles);
    } else if (fullPath.endsWith('.md')) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

function exportWiki() {
  console.log(`🔍 Scanning for Wiki files...`);
  
  if (!fs.existsSync(WIKI_DIR)) {
    console.error(`❌ Wiki directory not found at ${WIKI_DIR}`);
    return;
  }

  const mdFiles = getAllMarkdownFiles(WIKI_DIR);
  
  let combinedContent = `# picklePi Combined Wiki Knowledge Base\n\n`;
  for (const file of mdFiles) {
    combinedContent += `\n\n---\n\n## SOURCE: ${path.relative(WIKI_DIR, file)}\n\n`;
    combinedContent += fs.readFileSync(file, 'utf-8');
  }

  fs.writeFileSync(OUTPUT_FILE, combinedContent);
  console.log(`✅ Successfully combined ${mdFiles.length} wiki files into ${OUTPUT_FILE}!`);
}

exportWiki();