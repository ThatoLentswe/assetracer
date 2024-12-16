// utils/pdfUtil.js
const { PDFDocument } = require('pdf-lib');

// Generate a simple PDF report
const generatePDFReport = async (content) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  page.drawText(content, { x: 50, y: height - 50 });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};

module.exports = { generatePDFReport };
