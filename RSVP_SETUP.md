# RSVP System Setup Guide

This RSVP system includes email notifications, CSV data persistence, and automated reminder emails.

## Features

1. **Form Submission & Email Notifications**
   - Sends confirmation email to the host/organizer with all RSVP details
   - Sends confirmation email to the guest with wedding details
   - Clean HTML email templates for both emails

2. **Data Persistence**
   - Automatically appends RSVP submissions to `data/rsvp_responses.csv`
   - Handles concurrent submissions safely
   - Includes all form fields with timestamp

3. **Automated Recurring Reminders**
   - Background cron job sends reminder emails every 5 days
   - Reminders sent to confirmed attendees only
   - Automatically stops after wedding date passes
   - Runs at 9:00 AM (Africa/Kigali timezone)

## Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env.local` and configure your email settings:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your email configuration:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=your-email@gmail.com
ORGANIZER_EMAIL=organizer-email@gmail.com
```

**Important for Gmail Users:**
- You cannot use your regular Gmail password
- Generate an App Password at: https://myaccount.google.com/apppasswords
- Use the App Password in `SMTP_PASS`

### 2. Install Dependencies

Dependencies are already installed, but if you need to reinstall:

```bash
pnpm install
```

Required packages:
- `nodemailer` - Email sending
- `node-cron` - Scheduled tasks
- `csv-writer` - CSV file writing
- `csv-parse` - CSV file reading

### 3. Data Directory

The system automatically creates a `data/` directory and `rsvp_responses.csv` file on first submission.

### 4. Running the Reminder Server

The reminder cron job runs as a separate process:

```bash
pnpm reminders
```

This starts a long-running process that:
- Sends reminder emails every 5 days at 9:00 AM
- Automatically stops after the wedding date
- Requires the server to stay running

**Production Deployment:**
For production, deploy the reminder server to a platform that supports long-running processes:
- VPS (DigitalOcean, Linode, etc.)
- Render (Background Worker)
- Railway (Background Worker)
- AWS ECS with Fargate

### 5. Testing

To test the RSVP system:

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Navigate to the RSVP section and submit a test form

3. Check:
   - `data/rsvp_responses.csv` for the new entry
   - Your email for the confirmation email
   - The organizer email for the notification

### 6. Testing Reminders

To test reminders without waiting 5 days:

Edit `lib/cron-reminders.ts` and change the cron schedule:

```typescript
// Temporary: Run every minute for testing
const task = cron.schedule("* * * * *", sendReminders, {
  scheduled: true,
  timezone: "Africa/Kigali",
});
```

**Remember to revert this change after testing!**

## API Endpoint

### POST /api/rsvp

Submits an RSVP and triggers email notifications.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+250 788 123 456",
  "attending": "yes",
  "message": "Looking forward to the celebration!",
  "website": "" // Honeypot field - should be empty
}
```

**Response:**
```json
{
  "success": true,
  "message": "RSVP submitted successfully"
}
```

## CSV Data Format

The CSV file (`data/rsvp_responses.csv`) contains:

| Column | Description |
|--------|-------------|
| ID | Unique identifier (timestamp-random) |
| Name | Guest name |
| Email | Guest email |
| Phone | Guest phone number |
| Attending | "yes" or "no" |
| Message | Optional message from guest |
| Submitted At | ISO timestamp of submission |

## Email Templates

### Host Email
- Includes all RSVP form fields
- Highlights attending status
- Shows submission timestamp
- Professional styling

### Guest Email
- Shows confirmation/decline status
- Displays wedding date and venue
- Includes couple names and hashtag
- Professional wedding-themed styling

### Reminder Email
- Countdown of days remaining
- Wedding date and venue details
- Friendly reminder message
- Sent every 5 days to confirmed guests

## Troubleshooting

### Emails not sending
- Check SMTP credentials in `.env.local`
- For Gmail, ensure you're using an App Password
- Check firewall/network settings
- Verify SMTP port (587 for TLS, 465 for SSL)

### CSV file not created
- Ensure the `data/` directory is writable
- Check file system permissions
- The file is created on first successful submission

### Reminders not running
- Ensure the reminder server is running (`pnpm reminders`)
- Check the cron schedule in `lib/cron-reminders.ts`
- Verify timezone settings
- Check that the wedding date hasn't passed

### Port conflicts
- The reminder server doesn't use a port (it's a background process)
- Only the Next.js dev server uses a port (default: 3000)

## Security Notes

1. **Never commit `.env.local`** - It contains sensitive email credentials
2. **Use App Passwords** - For Gmail, never use your regular password
3. **Honeypot Protection** - The `website` field helps prevent spam
4. **Rate Limiting** - Consider adding rate limiting in production
5. **Email Validation** - Consider additional email validation

## Production Checklist

- [ ] Set up production SMTP credentials
- [ ] Configure environment variables on hosting platform
- [ ] Deploy reminder server to long-running process host
- [ ] Test email delivery with production credentials
- [ ] Set up monitoring for reminder server
- [ ] Implement error logging (e.g., Sentry)
- [ ] Add rate limiting to API endpoint
- [ ] Configure backup for CSV data
- [ ] Test cron job execution
- [ ] Verify timezone settings

## Alternative: Database Storage

If you prefer a database over CSV:

1. Install a database (PostgreSQL, MySQL, MongoDB)
2. Replace CSV operations with database queries
3. Update the API endpoint to use database
4. Update reminder cron to read from database

The current CSV solution is simple and requires no additional infrastructure.
