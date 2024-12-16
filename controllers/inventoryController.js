// controllers/inventoryController.js
const { db } = require('../config/db');

// Get real-time inventory status
exports.getInventoryStatus = async (req, res) => {
  try {
    const inventorySnapshot = await db.collection('inventory').get();
    const inventoryItems = inventorySnapshot.docs.map(doc => doc.data());
    
    res.status(200).json({
      message: 'Inventory fetched successfully',
      inventory: inventoryItems,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Update inventory stock levels
exports.updateInventory = async (req, res) => {
  const { inventoryId } = req.params;
  const { quantity } = req.body;

  try {
    const inventoryRef = db.collection('inventory').doc(inventoryId);
    await inventoryRef.update({
      quantity,
    });
    
    res.status(200).json({
      message: 'Inventory updated successfully',
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
