// services/maintenanceService.js
const Maintenance = require('../models/maintenance'); // Maintenance model

// Schedule a maintenance for an asset
const scheduleMaintenance = async ({ assetId, maintenanceDate, description }) => {
  return await Maintenance.scheduleMaintenance({ assetId, maintenanceDate, description });
};

// Get maintenance records for an asset
const getMaintenanceRecordsByAssetId = async (assetId) => {
  return await Maintenance.getMaintenanceRecordsByAssetId(assetId);
};

// Update maintenance status
const updateMaintenanceStatus = async (maintenanceId, status) => {
  return await Maintenance.updateMaintenanceStatus(maintenanceId, status);
};

module.exports = { scheduleMaintenance, getMaintenanceRecordsByAssetId, updateMaintenanceStatus };
