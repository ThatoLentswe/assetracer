// services/assetService.js
const Asset = require('../models/asset'); // Asset model
const { generateBarcode } = require('../utils/barcodeUtil'); // Barcode generation utility

// Create an asset and generate barcode
const createAsset = async ({ name, serialNumber, location, status }) => {
  const asset = await Asset.createAsset({ name, serialNumber, location, status });
  const barcode = generateBarcode(asset.assetId);
  return { asset, barcode };
};

// Update asset details
const updateAsset = async (assetId, updateData) => {
  return await Asset.updateAsset(assetId, updateData);
};

// Get all assets
const getAllAssets = async () => {
  return await Asset.getAllAssets();
};

module.exports = { createAsset, updateAsset, getAllAssets };
