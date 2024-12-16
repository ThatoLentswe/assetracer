// controllers/assetController.js
const { db } = require('../config/db');

// Create a new asset
exports.createAsset = async (req, res) => {
  const { name, serialNumber, location } = req.body;

  try {
    const newAsset = await db.collection('assets').add({
      name,
      serialNumber,
      location,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    res.status(201).json({
      message: 'Asset created successfully',
      assetId: newAsset.id,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Get all assets
exports.getAssets = async (req, res) => {
  try {
    const assetsSnapshot = await db.collection('assets').get();
    const assets = assetsSnapshot.docs.map(doc => doc.data());
    
    res.status(200).json({
      message: 'Assets fetched successfully',
      assets,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Update asset details
exports.updateAsset = async (req, res) => {
  const { assetId } = req.params;
  const { name, location } = req.body;

  try {
    const assetRef = db.collection('assets').doc(assetId);
    await assetRef.update({
      name,
      location,
      updatedAt: new Date(),
    });
    
    res.status(200).json({
      message: 'Asset updated successfully',
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Delete asset
exports.deleteAsset = async (req, res) => {
  const { assetId } = req.params;

  try {
    await db.collection('assets').doc(assetId).delete();
    res.status(200).json({
      message: 'Asset deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
