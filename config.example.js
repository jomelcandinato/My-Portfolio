// This is an example configuration file
// Copy this to config.js and fill in your actual values
// Never commit config.js to version control

module.exports = {
  PORT: 3000,

  RECAPTCHA: {
    SITE_KEY: "YOUR_RECAPTCHA_SITE_KEY",
    SECRET_KEY: "YOUR_RECAPTCHA_SECRET_KEY",
  },

  EMAILJS: {
    USER_ID: "YOUR_EMAILJS_USER_ID",
    PRIVATE_KEY: "YOUR_EMAILJS_PRIVATE_KEY",
    SERVICE_ID: "YOUR_EMAILJS_SERVICE_ID",
    TEMPLATE_ID: "YOUR_EMAILJS_TEMPLATE_ID",
  },
};
