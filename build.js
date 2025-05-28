// build.js - Script to build both client and server for Vercel deployment
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Starting build process for Vercel deployment...');

// Ensure the dist directory exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

try {
  // Build client
  console.log('Building client...');
  execSync('cd client && npm run build', { stdio: 'inherit' });
  
  // Copy client build to dist
  console.log('Copying client build to dist...');
  if (!fs.existsSync('dist/client')) {
    fs.mkdirSync('dist/client', { recursive: true });
  }
  
  // Copy client build files
  fs.cpSync('client/dist', 'dist/client', { recursive: true });
  
  // Build server
  console.log('Building server...');
  execSync('npm run build:server', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
