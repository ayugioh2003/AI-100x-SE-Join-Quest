// Test runner that temporarily modifies package.json for CommonJS compatibility
import { readFileSync, writeFileSync } from 'fs';
import { spawn } from 'child_process';

const packageJsonPath = './package.json';
const originalPackageJson = readFileSync(packageJsonPath, 'utf8');

try {
  // Temporarily remove "type": "module"
  const modifiedPackageJson = originalPackageJson.replace('"type": "module",', '');
  writeFileSync(packageJsonPath, modifiedPackageJson);
  
  // Run cucumber tests
  const cucumber = spawn('npx', ['cucumber-js', '--config', 'cucumber.cjs'], {
    stdio: 'inherit',
    shell: true
  });
  
  cucumber.on('close', (code) => {
    // Restore original package.json
    writeFileSync(packageJsonPath, originalPackageJson);
    process.exit(code);
  });
  
} catch (error) {
  // Always restore original package.json
  writeFileSync(packageJsonPath, originalPackageJson);
  console.error('Error:', error);
  process.exit(1);
}