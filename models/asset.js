// models/asset.js
const { db } = require('../config/db'); // Firebase Firestore instance

class Asset {
  constructor(assetId, name, serialNumber, location, status, createdAt, updatedAt) {
    this.assetId = assetId;
    this.name = name;
    this.serialNumber = serialNumber;
    this.location = location;
    this.status = status || 'Active';
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  // Create a new asset
  static async createAsset({ name, serialNumber, location, status }) {
    try {
      const assetRef = db.collection('assets').doc(); // Create a new document
      const asset = new Asset(assetRef.id, name, serialNumber, location, status);

      await assetRef.set({
        assetId: asset.assetId,
        name: asset.name,
        serialNumber: asset.serialNumber,
        location: asset.location,
        status: asset.status,
        createdAt: asset.createdAt,
        updatedAt: asset.updatedAt,
      });

      return asset;
    } catch (error) {
      throw new Error('Error creating asset: ' + error.message);
    }
  }

  // Get all assets
  static async getAllAssets() {
    try {
      const assetSnapshot = await db.collection('assets').get();
      return assetSnapshot.docs.map(doc => doc.data());
    } catch (error) {
      throw new Error('Error fetching assets: ' + error.message);
    }
  }

  // Update asset details
  static async updateAsset(assetId, updateData) {
    try {
      const assetRef = db.collection('assets').doc(assetId);
      await assetRef.update(updateData);
      return { message: 'Asset updated successfully' };
    } catch (error) {
      throw new Error('Error updating asset: ' + error.message);
    }
  }
}

module.exports = Asset;
