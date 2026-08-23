import cron from "node-cron";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse";
import { weddingData } from "@/lib/wedding-data";
import type { ScheduledTask } from "node-cron";

// Email configuration
const EMAIL_CONFIG = {
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  from: process.env.FROM_EMAIL || "wedding@example.com",
};

// CSV file path
const CSV_PATH = path.join(process.cwd(), "data", "rsvp_responses.csv");

// Check if wedding date has passed
const isWeddingPassed = () => {
  const weddingDate = new Date(weddingData.eventDate.targetIso);
  const now = new Date();
  return now > weddingDate;
};

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport(EMAIL_CONFIG);
};

// Read RSVP data from CSV
const readRsvpData = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(CSV_PATH)) {
      resolve([]);
      return;
    }

    const records: any[] = [];
    fs.createReadStream(CSV_PATH)
      .pipe(parse({ columns: true, skip_empty_lines: true }))
      .on("data", (row) => records.push(row))
      .on("error", (error) => reject(error))
      .on("end", () => resolve(records));
  });
};

// Generate reminder email HTML
const generateReminderEmail = (data: any, daysRemaining: number) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Wedding Reminder</title>
      <style>
        body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #2b2520; background-color: #fdfaf4; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #2b2520; font-size: 28px; margin-bottom: 20px; text-align: center; }
        .couple { font-family: 'Cormorant Garamond', serif; font-size: 32px; color: #2b2520; text-align: center; margin-bottom: 30px; }
        .countdown { background: linear-gradient(135deg, #c8b99a 0%, #a89988 100%); padding: 30px; border-radius: 8px; margin: 20px 0; text-align: center; color: white; }
        .countdown-number { font-size: 48px; font-weight: bold; margin: 10px 0; }
        .countdown-label { font-size: 14px; text-transform: uppercase; letter-spacing: 2px; }
        .date-venue { background: #f4ece1; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
        .date-venue h2 { margin: 0 0 10px 0; color: #2b2520; }
        .details { color: #7b6f66; margin-top: 10px; }
        .reminder-box { border: 2px solid #c8b99a; padding: 20px; border-radius: 8px; margin: 20px 0; background: #faf8f3; }
        .footer { text-align: center; margin-top: 30px; color: #7b6f66; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="couple">${weddingData.couple.partnerOne} & ${weddingData.couple.partnerTwo}</div>
        <h1>🔔 Wedding Reminder</h1>
        
        <div class="countdown">
          <div class="countdown-number">${daysRemaining}</div>
          <div class="countdown-label">Days to Go</div>
        </div>
        
        <div class="date-venue">
          <h2>🗓️ ${weddingData.eventDate.displayDate}</h2>
          <div class="details">
            <p>${weddingData.eventDate.city}, ${weddingData.eventDate.country}</p>
          </div>
        </div>
        
        <div class="reminder-box">
          <h3 style="margin: 0 0 10px 0; color: #2b2520;">Friendly Reminder</h3>
          <p>We're getting closer to the big day! Just wanted to remind you about our upcoming celebration.</p>
          <p style="margin-top: 10px;">If you have any questions or need any assistance, please don't hesitate to reach out.</p>
        </div>
        
        <div class="footer">
          <p>With love,<br/>${weddingData.couple.partnerOne} & ${weddingData.couple.partnerTwo}</p>
          <p style="margin-top: 20px;">#${weddingData.couple.hashtag}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Calculate days remaining
const getDaysRemaining = () => {
  const weddingDate = new Date(weddingData.eventDate.targetIso);
  const now = new Date();
  const diffTime = weddingDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Send reminder emails
const sendReminders = async () => {
  // Check if wedding has passed
  if (isWeddingPassed()) {
    console.log("Wedding date has passed. Stopping reminder cron job.");
    return;
  }

  const daysRemaining = getDaysRemaining();
  console.log(`Running reminder job. Days remaining: ${daysRemaining}`);

  if (daysRemaining <= 0) {
    console.log("Wedding date has passed or is today. Stopping reminders.");
    return;
  }

  try {
    const records = await readRsvpData();
    const confirmedGuests = records.filter((r) => r.attending === "yes");

    if (confirmedGuests.length === 0) {
      console.log("No confirmed guests to remind.");
      return;
    }

    const transporter = createTransporter();

    for (const guest of confirmedGuests) {
      try {
        await transporter.sendMail({
          from: EMAIL_CONFIG.from,
          to: guest.email,
          subject: `Wedding Reminder: ${daysRemaining} Days to Go! 🎉`,
          html: generateReminderEmail(guest, daysRemaining),
        });
        console.log(`Reminder sent to: ${guest.email}`);
      } catch (error) {
        console.error(`Failed to send reminder to ${guest.email}:`, error);
      }
    }

    console.log(`Reminder emails sent to ${confirmedGuests.length} confirmed guests.`);
  } catch (error) {
    console.error("Error sending reminders:", error);
  }
};

// Start the cron job (runs every 5 days at 9:00 AM)
export function startReminderCron(): ScheduledTask {
  // Cron schedule: Run every 5 days at 9:00 AM
  // "0 9 */5 * *" = At 09:00 on every 5th day-of-month
  const task = cron.schedule("0 9 */5 * *", sendReminders, {
    timezone: "Africa/Kigali",
  });

  console.log("Reminder cron job started. Runs every 5 days at 9:00 AM (Africa/Kigali).");

  // Send initial reminder on startup for testing
  if (process.env.NODE_ENV === "development") {
    console.log("Development mode: Skipping initial reminder on startup.");
  } else {
    setTimeout(sendReminders, 5000); // Send initial reminder after 5 seconds
  }

  return task;
};

// Stop the cron job
export function stopReminderCron(task: ScheduledTask) {
  task.stop();
  console.log("Reminder cron job stopped.");
};
