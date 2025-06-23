const User = require('../models/Users');
const bcrypt = require('bcryptjs');

// Register a new user
const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    console.log('Incoming data:', req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists. Try logging in instead.' });
    }

    if (!['Attendee', 'Organizer', 'Admin'].includes(role)) {
      console.log('Invalid role:', role);
      return res.status(400).json({ message: 'Invalid role selected' });
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
    console.log('Hashed password:', hashedPassword);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    console.log('User saved successfully:', email);

    res.status(201).json({
      message: 'User registered successfully',
      role: newUser.role,
    });

  } catch (error) {
    console.error('Error in registerUser:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.password) {
      console.log('OAuth user attempting password login:', email);
      return res.status(403).json({ message: 'Password-based login not allowed for OAuth users' });
    }

    console.log('Stored hashed password:', user.password);
    console.log('Password entered:', password);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password for user:', email);
      return res.status(401).json({ message: 'Invalid password' });
    }

    console.log('Password matched successfully for user:', email);
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error in loginUser:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { registerUser, loginUser };
