// controllers/maintenanceController.js
const { db } = require('../config/db');

// Schedule maintenance for an asset
exports.scheduleMaintenance = async (req, res) => {
  const { assetId, maintenanceDate, description } = req.body;

  try {
    const newMaintenance = await db.collection('maintenance').add({
      assetId,
      maintenanceDate,
      description,
      status: 'Scheduled',
      createdAt: new Date(),
    });
    
    res.status(201).json({
      message: 'Maintenance scheduled successfully',
      maintenanceId: newMaintenance.id,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Get maintenance records for an asset
exports.getMaintenanceRecords = async (req, res) => {
  const { assetId } = req.params;

  try {
    const maintenanceSnapshot = await db.collection('maintenance')
      .where('assetId', '==', assetId)
      .get();
    const maintenanceRecords = maintenanceSnapshot.docs.map(doc => doc.data());
    
    res.status(200).json({
      message: 'Maintenance records fetched successfully',
      maintenanceRecords,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
