// brightshift_website.zip/pages/api/submit-form.js
import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const filePath = path.resolve(process.cwd(), 'data', 'contacts.xlsx');
    const workbook = new ExcelJS.Workbook();
    let worksheet;

    // Ensure the data directory exists
    const dataDir = path.resolve(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // If it exists, load the workbook
      await workbook.xlsx.readFile(filePath);
      // Try to get the existing worksheet named 'Contacts'
      worksheet = workbook.getWorksheet('Contacts');
    }

    // If no worksheet named 'Contacts' was found (either new workbook or missing sheet), create it
    if (!worksheet) {
      worksheet = workbook.addWorksheet('Contacts');
      // Define columns and headers only for a new worksheet
      worksheet.columns = [
        { header: 'Name', key: 'name', width: 30 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Phone', key: 'phone', width: 20 },
        { header: 'Submission Date', key: 'date', width: 25 }
      ];
      // Add a header row explicitly if it's a new worksheet
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
    }

    // Add new row data to the retrieved or newly created worksheet
    worksheet.addRow({ name, email, phone, date: new Date().toLocaleString() });

    try {
      await workbook.xlsx.writeFile(filePath);
      res.status(200).json({ message: 'Contact information saved successfully!' });
    } catch (error) {
      console.error('Error saving Excel file:', error);
      res.status(500).json({ message: 'Error saving contact information.', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}