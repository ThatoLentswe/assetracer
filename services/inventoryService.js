// services/inventoryService.js
const Inventory = require('../models/inventory'); // Inventory model

// Add inventory item
const addInventoryItem = async ({ assetId, quantity, location, reorderPoint }) => {
  return await Inventory.addInventoryItem({ assetId, quantity, location, reorderPoint });
};

// Update inventory item
const updateInventory = async (itemId, updateData) => {
  return await Inventory.updateInventory(itemId, updateData);
};

// Get inventory by itemId
const getInventoryById = async (itemId) => {
  return await Inventory.getInventoryById(itemId);
};

// Get all inventory items
const getAllInventoryItems = async () => {
  return await Inventory.getAllInventoryItems();
};

module.exports = { addInventoryItem, updateInventory, getInventoryById, getAllInventoryItems };
