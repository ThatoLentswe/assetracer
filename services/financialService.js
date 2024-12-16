// services/financialService.js
const Financial = require('../models/financial'); // Financial model

// Record financial data for an asset
const recordFinancialData = async ({ assetId, cost, depreciationValue }) => {
  return await Financial.recordFinancialData({ assetId, cost, depreciationValue });
};

// Get financial data for an asset
const getFinancialDataByAssetId = async (assetId) => {
  return await Financial.getFinancialDataByAssetId(assetId);
};

// Calculate Total Cost of Ownership (TCO)
const calculateTCO = (cost, depreciationValue, maintenanceCost) => {
  return cost - depreciationValue + maintenanceCost;
};

module.exports = { recordFinancialData, getFinancialDataByAssetId, calculateTCO };
