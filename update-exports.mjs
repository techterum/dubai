import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.join(__dirname, 'src', 'components');
const hooksDir = path.join(__dirname, 'src', 'hooks');

const updateExportStatement = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath, '.tsx');
  const exportStatement = `export const ${fileName}: React.FC = () => {`;
  const updatedContent = content.replace(
    /const (\w+): React\.FC = \(\) => \{/,
    exportStatement
  );
  fs.writeFileSync(filePath, updatedContent, 'utf-8');
};

const processDirectory = (dir) => {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isFile() && file.endsWith('.tsx')) {
      updateExportStatement(filePath);
    }
  });
};

processDirectory(componentsDir);
processDirectory(hooksDir);

console.log('Export statements updated successfully.');