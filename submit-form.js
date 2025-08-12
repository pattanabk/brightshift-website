// brightshift_website.zip/pages/api/submit-form.js
import path from 'path';
import fs from 'fs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Included 'additionalRequest' in the destructuring
    const { name, email, phone, additionalRequest } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const filePath = path.resolve(process.cwd(), 'data', 'contacts.csv');
    const dataDir = path.resolve(process.cwd(), 'data');

    // Ensure the data directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    // Format data for CSV
    const submissionDate = new Date().toLocaleString();
    // Added 'additionalRequest' to the CSV row
    const csvRow = `"${name}","${email}","${phone}","${submissionDate}","${additionalRequest || ''}"\n`; // Added || '' to handle undefined

    try {
      const fileExists = fs.existsSync(filePath);

      // If it's a new file, add UTF-8 BOM and headers first.
      // The UTF-8 BOM is '\uFEFF'
      if (!fileExists) {
        // Updated headers to include "Additional Request"
        const headers = `"Name","Email","Phone","Submission Date","Additional Request"\n`;
        await fs.promises.writeFile(filePath, '\uFEFF' + headers + csvRow, 'utf8'); // Added BOM here
      } else {
        await fs.promises.appendFile(filePath, csvRow, 'utf8');
      }

      res.status(200).json({ message: 'Contact information saved successfully!' });
    } catch (error) {
      console.error('Error saving CSV file:', error);
      res.status(500).json({ message: 'Error saving contact information.', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}