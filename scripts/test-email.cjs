/**
 * Email Configuration Test Script
 * 
 * Run this script to test your email configuration:
 * node scripts/test-email.js
 */

const nodemailer = require("nodemailer");

// Load environment variables from .env file
require("dotenv").config();

const EMAIL_CONFIG = {
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  from: process.env.FROM_EMAIL || "wedding@example.com",
  organizerEmail: process.env.ORGANIZER_EMAIL || "organizer@example.com",
};

console.log("Testing email configuration...");
console.log("SMTP Host:", EMAIL_CONFIG.host);
console.log("SMTP Port:", EMAIL_CONFIG.port);
console.log("From Email:", EMAIL_CONFIG.from);
console.log("Organizer Email:", EMAIL_CONFIG.organizerEmail);
console.log("Has SMTP User:", !!EMAIL_CONFIG.auth.user);
console.log("Has SMTP Pass:", !!EMAIL_CONFIG.auth.pass ? "Yes (hidden)" : "No");

if (!EMAIL_CONFIG.auth.user || !EMAIL_CONFIG.auth.pass) {
  console.error("\n❌ ERROR: SMTP credentials are missing!");
  console.log("Please set SMTP_USER and SMTP_PASS in your .env file");
  process.exit(1);
}

const transporter = nodemailer.createTransport(EMAIL_CONFIG);

console.log("\n🔄 Attempting to verify SMTP connection...");

transporter.verify((error, success) => {
  if (error) {
    console.error("\n❌ SMTP connection failed:");
    console.error(error);
    console.log("\n📝 Troubleshooting tips:");
    console.log("1. For Gmail, ensure you're using an App Password, not your regular password");
    console.log("2. Generate App Password at: https://myaccount.google.com/apppasswords");
    console.log("3. Check that 'Less secure app access' is enabled (if applicable)");
    console.log("4. Verify the SMTP host and port are correct");
    console.log("5. Check your firewall/network settings");
    process.exit(1);
  } else {
    console.log("\n✅ SMTP connection successful!");
    console.log("Your email configuration is working correctly.");
    
    // Send a test email
    console.log("\n🔄 Sending test email to:", EMAIL_CONFIG.organizerEmail);
    
    transporter.sendMail({
      from: EMAIL_CONFIG.from,
      to: EMAIL_CONFIG.organizerEmail,
      subject: "Test Email - RSVP System",
      html: `
        <h1>Test Email</h1>
        <p>This is a test email from your RSVP system.</p>
        <p>If you received this, your email configuration is working correctly!</p>
      `,
    }).then((info) => {
      console.log("\n✅ Test email sent successfully!");
      console.log("Message ID:", info.messageId);
      console.log("Response:", info.response);
      process.exit(0);
    }).catch((error) => {
      console.error("\n❌ Failed to send test email:");
      console.error(error);
      process.exit(1);
    });
  }
});
