# RSVP System Setup Guide

This RSVP system includes email notifications with email-only data persistence.

## Features

1. **Form Submission & Email Notifications**
   - Sends confirmation email to the host/organizer with all RSVP details
   - Sends confirmation email to the guest with wedding details
   - Clean HTML email templates for both emails

2. **Email-Only Data Persistence**
   - All RSVP data is stored in your email inbox
   - No database or file system required
   - Works perfectly on Vercel and other serverless platforms
   - Easy to export emails to CSV/Excel

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
- `dotenv` - Environment variable loading

### 3. Vercel Deployment

Add the same environment variables to your Vercel project:

1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Add all variables from your `.env.local` file
4. Redeploy your application

### 4. Testing

To test the RSVP system:

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Navigate to the RSVP section and submit a test form

3. Check:
   - Your email for the organizer notification
   - The guest email for the confirmation

### 5. Test Email Configuration

Run the email test script:

```bash
pnpm test-email
```

This will:
- Test your SMTP connection
- Send a test email to your organizer email
- Show detailed error messages if something fails

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
  "confirm_email": "" // Honeypot field - should be empty
}
```

**Response:**
```json
{
  "success": true,
  "message": "RSVP submitted successfully"
}
```

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

## Data Management

Since this is an email-only solution:

### Storage
- All RSVP data is stored in your email inbox
- Organizer receives a notification for each RSVP
- Guest receives a confirmation email

### Export to CSV/Excel
- Use your email client's export feature
- Filter emails by subject or sender
- Export to CSV/Excel format
- Import into other systems if needed

### Organization Tips
- Create a folder/label for RSVP emails
- Use email filters to auto-organize
- Search by guest name or email
- Archive old RSVPs after the wedding

## Troubleshooting

### Emails not sending
- Check SMTP credentials in `.env.local` and Vercel
- For Gmail, ensure you're using an App Password
- Check firewall/network settings
- Verify SMTP port (587 for TLS, 465 for SSL)
- Check Vercel logs for error messages

### Gmail App Password Issues
- Go to https://myaccount.google.com/apppasswords
- Create a new App Password named "Wedding RSVP"
- Use that 16-character password in your `.env` file
- Make sure 2FA is enabled on your Google account

### Vercel deployment issues
- Ensure all environment variables are set in Vercel
- Check Vercel logs for runtime errors
- Verify SMTP configuration is correct
- Test with production credentials

## Security Notes

1. **Never commit `.env.local`** - It contains sensitive email credentials
2. **Use App Passwords** - For Gmail, never use your regular password
3. **Honeypot Protection** - The `confirm_email` field helps prevent spam
4. **Rate Limiting** - Consider adding rate limiting in production
5. **Email Validation** - Consider additional email validation

## Production Checklist

- [ ] Set up production SMTP credentials
- [ ] Configure environment variables on Vercel
- [ ] Test email delivery with production credentials
- [ ] Monitor Vercel logs for errors
- [ ] Add rate limiting to API endpoint
- [ ] Create email filters for RSVP organization
- [ ] Test RSVP form in production

## Benefits of Email-Only Solution

- ✅ Works on Vercel (no file system issues)
- ✅ No database setup required
- ✅ Free to use
- ✅ Easy to maintain
- ✅ Built-in backup (email provider)
- ✅ Built-in search and organization
- ✅ No additional infrastructure costs
- ✅ Perfect for small to medium weddings

## Manual Reminders

Since automated reminders are disabled in email-only mode:

1. Review RSVP emails in your inbox
2. Create a list of confirmed guests
3. Send manual follow-up emails as needed
4. Use email filters to organize RSVPs by date

## Future Enhancements

If you need more advanced features later:

1. **Database Integration** - Add PostgreSQL or MongoDB
2. **Google Sheets Integration** - Store data in a spreadsheet
3. **Automated Reminders** - Add a cron job service
4. **Analytics Dashboard** - Track RSVP statistics
5. **Admin Panel** - Manage RSVPs from a web interface

The current email-only solution is perfect for most wedding use cases and can be enhanced later if needed.
