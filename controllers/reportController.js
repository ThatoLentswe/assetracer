// controllers/reportController.js
const { db } = require('../config/db');

// Generate asset report
exports.generateAssetReport = async (req, res) => {
  try {
    const assetsSnapshot = await db.collection('assets').get();
    const assets = assetsSnapshot.docs.map(doc => doc.data());
    
    // You can generate a PDF report here using some library like `pdfkit` or `puppeteer`
    
    res.status(200).json({
      message: 'Asset report generated successfully',
      assets,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
