// services/reportingService.js
const Asset = require('../models/asset'); // Asset model
const Inventory = require('../models/inventory'); // Inventory model
const Financial = require('../models/financial'); // Financial model

// Generate a report for asset status
const generateAssetReport = async () => {
  const assets = await Asset.getAllAssets();
  const report = assets.map(asset => ({
    assetId: asset.assetId,
    name: asset.name,
    status: asset.status,
    location: asset.location,
  }));
  return report;
};

// Generate inventory report
const generateInventoryReport = async () => {
  const inventoryItems = await Inventory.getAllInventoryItems();
  const report = inventoryItems.map(item => ({
    itemId: item.itemId,
    assetId: item.assetId,
    quantity: item.quantity,
    location: item.location,
  }));
  return report;
};

// Generate financial summary
const generateFinancialSummary = async () => {
  const assets = await Asset.getAllAssets();
  const financialData = await Promise.all(
    assets.map(asset => Financial.getFinancialDataByAssetId(asset.assetId))
  );
  return financialData;
};

module.exports = { generateAssetReport, generateInventoryReport, generateFinancialSummary };
