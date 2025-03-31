// scripts/copy-properties.js
const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '../src', 'properties.json');
const destPath = path.join(__dirname, '../public', 'properties.json');

fs.copyFile(srcPath, destPath, (err) => {
  if (err) {
    console.error('Error copying properties.json:', err);
    process.exit(1);
  } else {
    console.log('properties.json copied successfully to public folder');
  }
});
