const nodemailer = require('nodemailer');
const dotenv=require('dotenv');
dotenv.config()
const sendEmail = async (to, customOrganizerId) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"EBMS Team" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Your Organizer ID - EBMS Registration',
      html: `
        <h2>Welcome to EBMS!</h2>
        <p>Thank you for registering as an organizer.</p>
        <p><strong>Your Organizer ID:</strong> ${customOrganizerId}</p>
        <p>Please keep this ID safe. You can now log in and start managing your events on EBMS.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    throw new Error('Email could not be sent');
  }
};

module.exports = sendEmail;