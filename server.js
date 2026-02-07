require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
const emailjs = require("@emailjs/nodejs");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Serve the main HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Configuration endpoint - returns only the public keys needed by frontend
app.get("/api/config", (req, res) => {
  try {
    const config = {
      RECAPTCHA: {
        SITE_KEY: process.env.RECAPTCHA_SITE_KEY || "SITE_KEY_PLACEHOLDER",
      },
      EMAILJS: {
        USER_ID: process.env.EMAILJS_USER_ID || "YOUR_EMAILJS_USER_ID",
      },
    };

    console.log("Sending config to client");
    res.json(config);
  } catch (error) {
    console.error("Error generating config:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Contact form endpoint - handles form submission on server side
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message, recaptcha_token } = req.body;

    console.log("Received contact form submission:", { name, email, subject });

    // 1. Validate reCAPTCHA token
    if (!recaptcha_token) {
      return res.status(400).json({
        success: false,
        error: "reCAPTCHA token is required",
      });
    }

    // Verify reCAPTCHA with Google
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    const recaptchaResponse = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: recaptchaSecret,
          response: recaptcha_token,
        },
      },
    );

    if (!recaptchaResponse.data.success) {
      console.error("reCAPTCHA verification failed:", recaptchaResponse.data);
      return res.status(400).json({
        success: false,
        error: "reCAPTCHA verification failed",
      });
    }

    console.log("reCAPTCHA verified successfully");

    // 2. Validate form data
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    // 3. Send email using EmailJS
    const emailjsUserId = process.env.EMAILJS_USER_ID;
    const emailjsServiceId = process.env.EMAILJS_SERVICE_ID;
    const emailjsTemplateId = process.env.EMAILJS_TEMPLATE_ID;

    if (!emailjsUserId || !emailjsServiceId || !emailjsTemplateId) {
      console.error("EmailJS credentials not configured");
      return res.status(500).json({
        success: false,
        error: "Email service not configured",
      });
    }

    // Initialize EmailJS with private key
    emailjs.init({
      publicKey: emailjsUserId,
      privateKey: process.env.EMAILJS_PRIVATE_KEY,
    });

    const templateParams = {
      from_name: name,
      from_email: email,
      subject: subject,
      message: message,
      reply_to: email,
      to_name: "Jomel",
      date: new Date().toLocaleString(),
      recaptcha_token: recaptcha_token,
    };

    console.log("Sending email with EmailJS...");

    const emailResponse = await emailjs.send(
      emailjsServiceId,
      emailjsTemplateId,
      templateParams,
    );

    console.log("Email sent successfully:", emailResponse);

    res.json({
      success: true,
      message: "Message sent successfully",
      email_response: emailResponse,
    });
  } catch (error) {
    console.error("Error processing contact form:", error);

    let errorMessage = "Internal server error";
    if (error.response) {
      // EmailJS API error
      errorMessage = `Email service error: ${error.response.data}`;
    } else if (error.request) {
      // No response received
      errorMessage = "No response from email service";
    } else {
      // Request setup error
      errorMessage = `Request error: ${error.message}`;
    }

    res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(
    `reCAPTCHA Site Key: ${process.env.RECAPTCHA_SITE_KEY ? "Configured" : "Not configured"}`,
  );
  console.log(
    `EmailJS User ID: ${process.env.EMAILJS_USER_ID ? "Configured" : "Not configured"}`,
  );
});
