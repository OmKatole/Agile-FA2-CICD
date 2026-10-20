import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const output = join(root, 'dist');
const requiredFiles = ['index.html', 'style.css', 'src/app.js', 'src/studentManager.js'];
const missingFiles = requiredFiles.filter((file) => !existsSync(join(root, file)));

if (missingFiles.length > 0) {
  console.error(`Build failed. Missing required files: ${missingFiles.join(', ')}`);
  process.exitCode = 1;
} else {
  rmSync(output, { recursive: true, force: true });
  mkdirSync(output, { recursive: true });
  cpSync(join(root, 'index.html'), join(output, 'index.html'));
  cpSync(join(root, 'style.css'), join(output, 'style.css'));
  cpSync(join(root, 'src'), join(output, 'src'), { recursive: true });
  console.log('Build successful: static site copied to dist/.');
}
