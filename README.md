# Phase 2 Coffee Co Website

This is the official website for Phase 2 Coffee Co, a mobile coffee catering service in Kansas City.

## Email Form Setup

The website is configured to send form submissions to the following email addresses:
- info@phase2coffeeco.com
- phase2coffee@gmail.com

### Vercel Deployment Instructions

To ensure the form submission emails work correctly when deployed to Vercel, follow these steps:

1. **Set up environment variables in Vercel:**
   - Go to your Vercel project dashboard
   - Navigate to "Settings" > "Environment Variables"
   - Add the following environment variables:
     - `EMAIL_HOST`: Your SMTP server (e.g., smtp.gmail.com)
     - `EMAIL_PORT`: Your SMTP port (e.g., 465 for SSL)
     - `EMAIL_USER`: Your email username/address
     - `EMAIL_PASSWORD`: Your email password or app password

2. **For Gmail users:**
   - You'll need to create an "App Password" instead of using your regular password
   - Go to your Google Account > Security > 2-Step Verification > App passwords
   - Create a new app password for "Mail" and use that for the `EMAIL_PASSWORD` variable

3. **Testing the form:**
   - After deployment, submit a test form to ensure emails are being sent correctly
   - Check both email addresses to confirm receipt

### Local Development

For local development, you can use environment variables in a `.env.local` file:

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

Note: The `.env.local` file is included in `.gitignore` and should not be committed to the repository.

## Website Structure

The website has the following pages:
- Home (index.html)
- Services (services.html)
- Gallery (gallery.html)
- About Us (about-us.html)
- Meet the Team (meet-the-team.html)
- Testimonials (testimonials.html)
- FAQ (faq.html)
- Contact (contact.html)
- Thank You (thank-you.html)

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Vercel Serverless Functions (for form handling)
- Nodemailer (for sending emails)

## Overview

This website is designed to showcase Phase 2 Coffee Co's mobile coffee catering services and generate leads through booking forms. The site is optimized for SEO with a focus on the following keywords:

- Main keyword: Coffee Cart Kansas City
- Secondary keywords: mobile coffee catering, coffee catering, coffee catering for events, coffee catering for weddings, mobile coffee bar, mobile espresso bar

## Pages

The website consists of 7 pages:

1. **Home** (index.html) - Main landing page with overview of services and booking forms
2. **Services** (pages/services.html) - Detailed information about coffee catering services
3. **Menu** (pages/menu.html) - Coffee and beverage menu options
4. **Gallery** (pages/gallery.html) - Photos of the coffee cart at various events
5. **About Us** (pages/about.html) - Information about the company and team
6. **Testimonials** (pages/testimonials.html) - Customer reviews and testimonials
7. **Contact** (pages/contact.html) - Contact information and booking form

## Features

- Responsive design that works on all devices
- Multiple lead generation forms strategically placed throughout the site
- SEO optimization for target keywords
- Mobile-friendly navigation
- Form validation for all booking forms
- Testimonial slider on the homepage

## Setup

This is a static website that can be deployed on any web hosting service. Simply upload all files and folders to your web server.

## Lead Generation Forms

The website includes multiple booking forms to maximize lead generation:

- Top of homepage
- Bottom of homepage
- Footer of every page
- Dedicated forms on the Services and Contact pages

Each form collects the following information:
- Name
- Phone
- Email
- Type of Event
- Event Date
- Event Location
- Guest Count
- Time of Event
- Message/Additional requests

## Customization

To customize this website for Phase 2 Coffee Co:

1. Replace placeholder images with actual photos of the coffee cart, events, and team
2. Update contact information with actual phone numbers and email addresses
3. Add real pricing information to the packages section
4. Connect the forms to a form handling service or email system
5. Add Google Analytics or other tracking code

## Credits

- Fonts: Google Fonts (Poppins)
- Icons: Font Awesome
- Placeholder Images: Unsplash

## License

This website is created for Phase 2 Coffee Co and is not licensed for redistribution. 