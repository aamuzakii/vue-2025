import { readFileSync } from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'src', 'jobs-2.json');
  const data = JSON.parse(readFileSync(filePath, 'utf-8'));

  res.status(200).json(data);
}
