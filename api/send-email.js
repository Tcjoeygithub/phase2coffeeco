const sgMail = require('@sendgrid/mail');

module.exports = async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get form data from request body
    const {
      name,
      email,
      phone,
      eventType,
      eventDate,
      eventLocation,
      guestCount,
      eventTime,
      message
    } = req.body;

    // Set SendGrid API key from environment variable
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Create email message
    const msg = {
      to: ['leadbros@protonmail.com', 'Phase2coffee@gmail.com'],
      from: process.env.SENDGRID_SENDER_EMAIL,
      subject: `New Coffee Catering Quote Request from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Event Type: ${eventType}
        Event Date: ${eventDate}
        Event Location: ${eventLocation}
        Guest Count: ${guestCount}
        Event Time: ${eventTime || 'Not specified'}
        Message: ${message || 'No message provided'}
      `,
      html: `
        <h2>New Coffee Catering Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Event Type:</strong> ${eventType}</p>
        <p><strong>Event Date:</strong> ${eventDate}</p>
        <p><strong>Event Location:</strong> ${eventLocation}</p>
        <p><strong>Guest Count:</strong> ${guestCount}</p>
        <p><strong>Event Time:</strong> ${eventTime || 'Not specified'}</p>
        <p><strong>Message:</strong> ${message || 'No message provided'}</p>
      `
    };

    // Send email
    await sgMail.send(msg);

    // Return success response
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Return error response
    return res.status(500).json({ 
      error: 'Error sending email',
      details: error.message 
    });
  }
}; 