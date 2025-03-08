export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      name, 
      phone, 
      email, 
      'event-type': eventType, 
      'event-date': eventDate,
      'event-location': eventLocation,
      'guest-count': guestCount,
      'event-time': eventTime,
      message 
    } = req.body;

    // Use Nodemailer to send emails
    const nodemailer = require('nodemailer');
    
    // Create a transporter (configure with your email provider)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Format the email content
    const emailContent = `
New Quote Request from Phase 2 Coffee Co Website

Name: ${name}
Phone: ${phone}
Email: ${email}
Event Type: ${eventType}
Event Date: ${eventDate}
Event Location: ${eventLocation}
Guest Count: ${guestCount}
Event Time: ${eventTime}
Message: ${message}

This request was submitted from the Phase 2 Coffee Co website.
    `;

    // Compose email
    const mailOptions = {
      from: `"Phase 2 Coffee Co Website" <${process.env.EMAIL_USER}>`,
      to: 'info@phase2coffeeco.com, phase2coffee@gmail.com',
      subject: 'New Quote Request from Phase 2 Coffee Co Website',
      text: emailContent,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Return success response
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
} 