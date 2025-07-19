const express = require('express');
const router = express.Router();
const User = require('../models/Users');  // make sure you import your User model here!
const { registerUser, loginUser } = require('../controllers/userController');
const nodemailer = require('nodemailer');


// POST /api/users/register
router.post('/register', registerUser);

// POST /api/users/login
router.post('/login', loginUser);

// GET /api/users/:email  - get user details by email (for role fetch)
router.get('/:email', async (req, res) => {
  const email = req.params.email;
  try {
    const user = await User.findOne({ email }).select('role username email');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user by email:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/users - Fetch all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('username email role createdAt updatedAt');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
});
// POST /api/users/reset-password
router.post('/reset-password', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: 'No user found with that email' });

    // Setup your transporter (example with Gmail - adjust as needed)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail or SMTP email
        pass: process.env.EMAIL_PASS, // App password
      },
    });

    const resetLink = `${process.env.APPLICATION_URL}/reset-password?email=${email}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      html: `<p>Hi ${user.name || ''},</p>
             <p>Click the link below to reset your password:</p>
             <a href="${resetLink}">${resetLink}</a>
             <p>If you didn't request this, please ignore this email.</p>`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Password reset email sent' });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ message: 'Failed to send reset email' });
  }
});

// POST /api/users/update-password
router.post('/update-password', async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword)
    return res.status(400).json({ message: "Email and new password are required" });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Server error while updating password" });
  }
});

module.exports = router;
