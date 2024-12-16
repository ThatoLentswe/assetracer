// controllers/financialController.js
const { db } = require('../config/db');

// Track asset cost and depreciation
exports.trackAssetCost = async (req, res) => {
  const { assetId, cost, depreciationRate } = req.body;

  try {
    const depreciationValue = cost * (depreciationRate / 100);
    const financialRecord = await db.collection('financial').add({
      assetId,
      cost,
      depreciationValue,
      createdAt: new Date(),
    });
    
    res.status(201).json({
      message: 'Asset financial record created',
      financialRecordId: financialRecord.id,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
