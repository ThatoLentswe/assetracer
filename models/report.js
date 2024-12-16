// models/report.js
const { db } = require('../config/db'); // Firebase Firestore instance

class Report {
  constructor(reportId, type, data, createdAt) {
    this.reportId = reportId;
    this.type = type;
    this.data = data;
    this.createdAt = createdAt || new Date();
  }

  // Generate a report
  static async generateReport({ type, data }) {
    try {
      const reportRef = db.collection('reports').doc(); // Create a new document
      const report = new Report(reportRef.id, type, data);

      await reportRef.set({
        reportId: report.reportId,
        type: report.type,
        data: report.data,
        createdAt: report.createdAt,
      });

      return report;
    } catch (error) {
      throw new Error('Error generating report: ' + error.message);
    }
  }

  // Get a report by reportId
  static async getReportById(reportId) {
    try {
      const reportRef = db.collection('reports').doc(reportId);
      const doc = await reportRef.get();
      if (!doc.exists) {
        throw new Error('Report not found');
      }
      return doc.data();
    } catch (error) {
      throw new Error('Error fetching report: ' + error.message);
    }
  }
}

module.exports = Report;
