// models/maintenance.js
const { db } = require('../config/db'); // Firebase Firestore instance

class Maintenance {
  constructor(maintenanceId, assetId, maintenanceDate, description, status, createdAt) {
    this.maintenanceId = maintenanceId;
    this.assetId = assetId;
    this.maintenanceDate = maintenanceDate;
    this.description = description;
    this.status = status || 'Scheduled';
    this.createdAt = createdAt || new Date();
  }

  // Schedule a maintenance
  static async scheduleMaintenance({ assetId, maintenanceDate, description }) {
    try {
      const maintenanceRef = db.collection('maintenance').doc(); // Create a new document
      const maintenance = new Maintenance(maintenanceRef.id, assetId, maintenanceDate, description);

      await maintenanceRef.set({
        maintenanceId: maintenance.maintenanceId,
        assetId: maintenance.assetId,
        maintenanceDate: maintenance.maintenanceDate,
        description: maintenance.description,
        status: maintenance.status,
        createdAt: maintenance.createdAt,
      });

      return maintenance;
    } catch (error) {
      throw new Error('Error scheduling maintenance: ' + error.message);
    }
  }

  // Get maintenance records by assetId
  static async getMaintenanceRecordsByAssetId(assetId) {
    try {
      const maintenanceSnapshot = await db.collection('maintenance').where('assetId', '==', assetId).get();
      return maintenanceSnapshot.docs.map(doc => doc.data());
    } catch (error) {
      throw new Error('Error fetching maintenance records: ' + error.message);
    }
  }
}

module.exports = Maintenance;
