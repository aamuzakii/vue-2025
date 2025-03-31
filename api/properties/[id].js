import { readFileSync } from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { id } = req.query; // works on Vercel
  const filePath = path.join(process.cwd(), 'src', 'properties.json');
  const data = JSON.parse(readFileSync(filePath, 'utf-8'));

  const property = data.find((p) => String(p.id) === String(id));

  if (property) {
    res.status(200).json(property);
  } else {
    res.status(404).json({ message: 'Property not found' });
  }
}
