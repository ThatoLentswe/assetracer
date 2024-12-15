// models/inventory.js
const { db } = require('../config/db'); // Firebase Firestore instance

class Inventory {
  constructor(itemId, assetId, quantity, location, reorderPoint, createdAt, updatedAt) {
    this.itemId = itemId;
    this.assetId = assetId;
    this.quantity = quantity;
    this.location = location;
    this.reorderPoint = reorderPoint || 10;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  // Add new inventory item
  static async addInventoryItem({ assetId, quantity, location, reorderPoint }) {
    try {
      const inventoryRef = db.collection('inventory').doc(); // Create a new document
      const inventoryItem = new Inventory(inventoryRef.id, assetId, quantity, location, reorderPoint);

      await inventoryRef.set({
        itemId: inventoryItem.itemId,
        assetId: inventoryItem.assetId,
        quantity: inventoryItem.quantity,
        location: inventoryItem.location,
        reorderPoint: inventoryItem.reorderPoint,
        createdAt: inventoryItem.createdAt,
        updatedAt: inventoryItem.updatedAt,
      });

      return inventoryItem;
    } catch (error) {
      throw new Error('Error adding inventory item: ' + error.message);
    }
  }

  // Update inventory stock
  static async updateInventory(itemId, updateData) {
    try {
      const inventoryRef = db.collection('inventory').doc(itemId);
      await inventoryRef.update(updateData);
      return { message: 'Inventory updated successfully' };
    } catch (error) {
      throw new Error('Error updating inventory: ' + error.message);
    }
  }

  // Get inventory by itemId
  static async getInventoryById(itemId) {
    try {
      const inventoryRef = db.collection('inventory').doc(itemId);
      const doc = await inventoryRef.get();
      if (!doc.exists) {
        throw new Error('Inventory item not found');
      }
      return doc.data();
    } catch (error) {
      throw new Error('Error fetching inventory: ' + error.message);
    }
  }
}

module.exports = Inventory;

