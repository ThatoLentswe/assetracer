// models/financial.js
const { db } = require('../config/db'); // Firebase Firestore instance

class Financial {
  constructor(financialId, assetId, cost, depreciationValue, totalCost, createdAt) {
    this.financialId = financialId;
    this.assetId = assetId;
    this.cost = cost;
    this.depreciationValue = depreciationValue;
    this.totalCost = totalCost;
    this.createdAt = createdAt || new Date();
  }

  // Record financial data for an asset
  static async recordFinancialData({ assetId, cost, depreciationValue }) {
    const totalCost = cost - depreciationValue;
    try {
      const financialRef = db.collection('financial').doc(); // Create a new document
      const financial = new Financial(financialRef.id, assetId, cost, depreciationValue, totalCost);

      await financialRef.set({
        financialId: financial.financialId,
        assetId: financial.assetId,
        cost: financial.cost,
        depreciationValue: financial.depreciationValue,
        totalCost: financial.totalCost,
        createdAt: financial.createdAt,
      });

      return financial;
    } catch (error) {
      throw new Error('Error recording financial data: ' + error.message);
    }
  }

  // Get financial data by assetId
  static async getFinancialDataByAssetId(assetId) {
    try {
      const financialSnapshot = await db.collection('financial').where('assetId', '==', assetId).get();
      return financialSnapshot.docs.map(doc => doc.data());
    } catch (error) {
      throw new Error('Error fetching financial data: ' + error.message);
    }
  }
}

module.exports = Financial;
