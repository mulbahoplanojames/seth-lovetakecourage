/**
 * Reminder Server
 *
 * This is a standalone server for running the reminder cron job.
 * In production, this should be run as a separate process or deployed
 * to a platform that supports long-running processes (e.g., VPS, Render, Railway).
 *
 * To run: pnpm reminders
 */

// Load environment variables
require("dotenv").config();

// Import using dynamic import for ESM compatibility
import("./lib/cron-reminders.js").then((module) => {
  module.startReminderCron();
  console.log("Reminder server is running. Press Ctrl+C to stop.");
}).catch((error) => {
  console.error("Failed to start reminder server:", error);
});
