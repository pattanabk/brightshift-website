// brightshift_website.zip/pages/api/submit-form.js
import path from 'path';
import fs from 'fs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const filePath = path.resolve(process.cwd(), 'data', 'contacts.txt'); // Changed to .txt
    const dataDir = path.resolve(process.cwd(), 'data');

    // Ensure the data directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    const submissionData = `Name: ${name}, Email: ${email}, Phone: ${phone}, Submission Date: ${new Date().toLocaleString()}\n`;

    try {
      // Append data to the file. If the file doesn't exist, it will be created.
      await fs.promises.appendFile(filePath, submissionData, 'utf8');
      res.status(200).json({ message: 'Contact information saved successfully to text file!' });
    } catch (error) {
      console.error('Error saving text file:', error);
      res.status(500).json({ message: 'Error saving contact information.', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}