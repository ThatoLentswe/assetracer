// services/notificationService.js
const nodemailer = require('nodemailer');
const { db } = require('../config/db'); // Firebase Firestore instance

// Send email notification
const sendEmailNotification = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

// Send SMS notification (using Twilio or another service)
const sendSMSNotification = async (phoneNumber, message) => {
  // Example: Twilio integration (replace with actual service)
  const twilio = require('twilio');
  const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

  await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber,
  });
};

module.exports = { sendEmailNotification, sendSMSNotification };
