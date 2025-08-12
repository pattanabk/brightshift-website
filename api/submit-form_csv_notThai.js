// brightshift_website.zip/pages/api/submit-form.js
import path from 'path';
import fs from 'fs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const filePath = path.resolve(process.cwd(), 'data', 'contacts.csv'); // Changed to .csv
    const dataDir = path.resolve(process.cwd(), 'data');

    // Ensure the data directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    // Format data for CSV
    const submissionDate = new Date().toLocaleString();
    const csvRow = `"${name}","${email}","${phone}","${submissionDate}"\n`;

    try {
      // Check if the file exists to decide if headers are needed
      const fileExists = fs.existsSync(filePath);

      // Append data to the file. If the file doesn't exist, it will be created.
      // If it's a new file, add headers first.
      if (!fileExists) {
        const headers = `"Name","Email","Phone","Submission Date"\n`;
        await fs.promises.writeFile(filePath, headers + csvRow, 'utf8');
      } else {
        await fs.promises.appendFile(filePath, csvRow, 'utf8');
      }

      res.status(200).json({ message: 'Contact information saved successfully to CSV file!' });
    } catch (error) {
      console.error('Error saving CSV file:', error);
      res.status(500).json({ message: 'Error saving contact information.', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}