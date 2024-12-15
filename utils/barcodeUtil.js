// utils/barcodeUtil.js
const QRCode = require('qrcode');

// Generate barcode for asset ID
const generateBarcode = (assetId) => {
  return QRCode.toDataURL(assetId);
};

module.exports = { generateBarcode };
