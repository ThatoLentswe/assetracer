// utils/validationUtil.js
// Example validation function for email
const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };
  
  // Validate required fields
  const validateRequiredFields = (fields) => {
    return fields.every(field => field && field.trim() !== '');
  };
  
  module.exports = { validateEmail, validateRequiredFields };
  