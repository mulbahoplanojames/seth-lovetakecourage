import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createObjectCsvWriter } from "csv-writer";
import path from "path";
import fs from "fs";
import { weddingData } from "@/lib/wedding-data";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Email configuration - should be moved to environment variables
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

// CSV file path
const CSV_PATH = path.join(process.cwd(), "data", "rsvp_responses.csv");

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Initialize CSV file with headers if it doesn't exist
const initializeCsvFile = async () => {
  ensureDataDir();
  if (!fs.existsSync(CSV_PATH)) {
    const csvWriter = createObjectCsvWriter({
      path: CSV_PATH,
      header: [
        { id: "id", title: "ID" },
        { id: "name", title: "Name" },
        { id: "email", title: "Email" },
        { id: "phone", title: "Phone" },
        { id: "attending", title: "Attending" },
        { id: "message", title: "Message" },
        { id: "submittedAt", title: "Submitted At" },
      ],
    });
    await csvWriter.writeRecords([]);
  }
};

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport(EMAIL_CONFIG);
};

// Generate host email HTML
const generateHostEmail = (data: any) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New RSVP Submission</title>
      <style>
        body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #2b2520; background-color: #fdfaf4; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #2b2520; font-size: 24px; margin-bottom: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: 600; color: #7b6f66; font-size: 14px; }
        .value { color: #2b2520; font-size: 16px; margin-top: 5px; }
        .attending-yes { color: #3a7d44; font-weight: 600; }
        .attending-no { color: #d32f2f; font-weight: 600; }
        .message { background: #f4ece1; padding: 15px; border-radius: 4px; margin-top: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🎉 New RSVP Submission</h1>
        <div class="field">
          <div class="label">Name:</div>
          <div class="value">${data.name}</div>
        </div>
        <div class="field">
          <div class="label">Email:</div>
          <div class="value">${data.email}</div>
        </div>
        <div class="field">
          <div class="label">Phone:</div>
          <div class="value">${data.phone || "Not provided"}</div>
        </div>
        <div class="field">
          <div class="label">Attending:</div>
          <div class="value ${data.attending === "yes" ? "attending-yes" : "attending-no"}">
            ${data.attending === "yes" ? "✓ Yes" : "✗ No"}
          </div>
        </div>
        ${data.message ? `
        <div class="field">
          <div class="label">Message:</div>
          <div class="message">${data.message}</div>
        </div>
        ` : ""}
        <div class="field">
          <div class="label">Submitted:</div>
          <div class="value">${new Date().toLocaleString()}</div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Generate guest email HTML
const generateGuestEmail = (data: any) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>RSVP Confirmation</title>
      <style>
        body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #2b2520; background-color: #fdfaf4; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #2b2520; font-size: 28px; margin-bottom: 20px; text-align: center; }
        .couple { font-family: 'Cormorant Garamond', serif; font-size: 32px; color: #2b2520; text-align: center; margin-bottom: 30px; }
        .date-venue { background: #f4ece1; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
        .date-venue h2 { margin: 0 0 10px 0; color: #2b2520; }
        .details { color: #7b6f66; margin-top: 10px; }
        .confirmation { background: #e8f5e9; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
        .confirmation h3 { margin: 0 0 10px 0; color: #2e7d32; }
        .decline { background: #ffebee; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
        .decline h3 { margin: 0 0 10px 0; color: #c62828; }
        .footer { text-align: center; margin-top: 30px; color: #7b6f66; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="couple">${weddingData.couple.partnerOne} & ${weddingData.couple.partnerTwo}</div>
        <h1>RSVP Confirmation</h1>
        
        ${data.attending === "yes" ? `
        <div class="confirmation">
          <h3>✓ You're Confirmed!</h3>
          <p>We're so excited to celebrate with you!</p>
        </div>
        ` : `
        <div class="decline">
          <h3>✗ Unable to Attend</h3>
          <p>We'll miss you, but thank you for letting us know.</p>
        </div>
        `}
        
        <div class="date-venue">
          <h2>🗓️ ${weddingData.eventDate.displayDate}</h2>
          <div class="details">
            <p>${weddingData.eventDate.city}, ${weddingData.eventDate.country}</p>
          </div>
        </div>
        
        <p>If you have any questions or need to update your RSVP, please don't hesitate to contact us.</p>
        
        <div class="footer">
          <p>With love,<br/>${weddingData.couple.partnerOne} & ${weddingData.couple.partnerTwo}</p>
          <p style="margin-top: 20px;">#${weddingData.couple.hashtag}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export async function POST(request: NextRequest) {
  try {
    // console.log("=== RSVP Submission Started ===");
    const body = await request.json();
    const { name, email, phone, attending, message, confirm_email } = body;

    // console.log("Received data:", { name, email, attending });

    // Honeypot check
    if (confirm_email) {
      // console.log("Honeypot triggered - bot detected");
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Validation
    if (!name || !email || !attending) {
      // console.log("Validation failed - missing required fields");
      return NextResponse.json(
        { error: "Name, email, and attending status are required" },
        { status: 400 }
      );
    }

    // Initialize CSV file
    await initializeCsvFile();

    // Generate unique ID
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Prepare data
    const rsvpData = {
      id,
      name,
      email,
      phone: phone || "",
      attending,
      message: message || "",
      submittedAt: new Date().toISOString(),
    };

    // Append to CSV
    const csvWriter = createObjectCsvWriter({
      path: CSV_PATH,
      header: [
        { id: "id", title: "ID" },
        { id: "name", title: "Name" },
        { id: "email", title: "Email" },
        { id: "phone", title: "Phone" },
        { id: "attending", title: "Attending" },
        { id: "message", title: "Message" },
        { id: "submittedAt", title: "Submitted At" },
      ],
      append: true,
    });

    await csvWriter.writeRecords([rsvpData]);
    // console.log("CSV record saved successfully");

    // Send emails
    try {
      const transporter = createTransporter();

      // Verify SMTP configuration
      // console.log("Email config check:", {
      //   host: EMAIL_CONFIG.host,
      //   port: EMAIL_CONFIG.port,
      //   hasUser: !!EMAIL_CONFIG.auth.user,
      //   hasPass: !!EMAIL_CONFIG.auth.pass,
      //   from: EMAIL_CONFIG.from,
      //   organizerEmail: EMAIL_CONFIG.organizerEmail,
      // });

      // Email to host/organizer
      // console.log("Sending host email to:", EMAIL_CONFIG.organizerEmail);
      const hostResult = await transporter.sendMail({
        from: EMAIL_CONFIG.from,
        to: EMAIL_CONFIG.organizerEmail,
        subject: `New RSVP: ${name} ${attending === "yes" ? "✓" : "✗"}`,
        html: generateHostEmail(rsvpData),
      });
      // console.log("Host email sent successfully:", hostResult.messageId);

      // Email to guest
      // console.log("Sending guest email to:", email);
      const guestResult = await transporter.sendMail({
        from: EMAIL_CONFIG.from,
        to: email,
        subject: "RSVP Confirmation - Wedding Celebration",
        html: generateGuestEmail(rsvpData),
      });
      // console.log("Guest email sent successfully:", guestResult.messageId);
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      // Return success even if email fails (data is saved to CSV)
      // In production, you might want to handle this differently
      // console.warn("RSVP saved to CSV but email failed");
    }

    // console.log("=== RSVP Submission Completed ===");
    return NextResponse.json({ success: true, message: "RSVP submitted successfully" });
  } catch (error) {
    console.error("RSVP submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit RSVP. Please try again." },
      { status: 500 }
    );
  }
}
