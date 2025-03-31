import fs from 'fs';
import path from 'path';

const basePath = './src';

const files = ['jobs.json', 'properties.json'];

const db = {};

files.forEach((file) => {
  const filePath = path.join(basePath, file);
  const key = path.basename(file, '.json'); // e.g., jobs.json → jobs
  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  db[key] = content;
});

fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));

console.log('✅ db.json generated!');
