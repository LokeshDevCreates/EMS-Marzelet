const Organizer = require('../../models/organizer');
const sendEmail = require('../../utils/sendEmail');

// ✅ Generate unique Organizer ID like OG10001
const generateOrganizerId = async () => {
  const last = await Organizer.findOne().sort({ createdAt: -1 });
  const lastId = last?.customOrganizerId?.slice(2) || "10000";
  let newId = String(parseInt(lastId) + 1);

  while (await Organizer.findOne({ customOrganizerId: `OG${newId}` })) {
    newId = String(parseInt(newId) + 1);
  }

  return `OG${newId}`;
};

// ✅ Register Organizer
exports.registerOrganizer = async (req, res) => {
  try {
    const {
      name,
      age,
      email,
      phone,
      organizationType,
      organizationName,
      profession,
      description
    } = req.body;

    // Validate phone
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ message: 'Phone number must be 10 digits' });
    }

    // Check existing email
    const existing = await Organizer.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Generate ID
    const customOrganizerId = await generateOrganizerId();

    // Get profile image
    const profileImage = req.files?.profileImage?.[0]?.path.replace(/\\/g, '/') || null;

    const newOrganizer = new Organizer({
      customOrganizerId,
      name,
      age,
      email,
      phone,
      organizationType,
      organizationName,
      profession,
      description,
      profileImage,
    });

    await newOrganizer.save();
    await sendEmail(email, customOrganizerId);

    res.status(201).json({
      message: 'Registration successful',
      organizerId: customOrganizerId,
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

// ✅ Get Organizer by ID
exports.getOrganizerById = async (req, res) => {
  try {
    const organizer = await Organizer.findById(req.params.id);
    if (!organizer) {
      return res.status(404).json({ message: 'Organizer not found' });
    }
    res.status(200).json(organizer);
  } catch (err) {
    console.error('Error fetching organizer:', err);
    res.status(500).json({ message: 'Failed to fetch organizer', error: err.message });
  }
};

// ✅ Get All Organizers
exports.getAllOrganizers = async (req, res) => {
  try {
    const organizers = await Organizer.find();
    res.status(200).json(organizers);
  } catch (err) {
    console.error('Error fetching organizers:', err);
    res.status(500).json({ message: 'Failed to fetch organizers', error: err.message });
  }
};

// ✅ Update Organizer
exports.updateOrganizer = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      age,
      email,
      phone,
      organizationType,
      organizationName,
      profession,
      description
    } = req.body;

    const profileImage = req.file ? req.file.path.replace(/\\/g, '/') : undefined;

    const updateData = {
      name,
      age: Number(age),
      email,
      phone,
      organizationType,
      organizationName,
      profession,
      description,
    };

    if (profileImage) updateData.profileImage = profileImage;

    const updated = await Organizer.findByIdAndUpdate(id, updateData, { new: true });

    if (!updated) {
      return res.status(404).json({ message: 'Organizer not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};

// ✅ Delete Organizer
exports.deleteOrganizer = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Organizer.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Organizer not found' });
    }

    res.status(200).json({ message: 'Organizer deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Deletion failed', error: err.message });
  }
};

// ✅ Get Organizer by Email (for full profile)
exports.getOrganizerByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const organizer = await Organizer.findOne({ email });
    if (!organizer) {
      return res.status(404).json({ message: 'Organizer not found' });
    }
    res.status(200).json(organizer);
  } catch (err) {
    console.error('Email fetch error:', err);
    res.status(500).json({ message: 'Error fetching organizer', error: err.message });
  }
};

// ✅ Check if Organizer exists by Email (true/false)
exports.checkOrganizerByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const exists = await Organizer.exists({ email });
    res.status(200).json({ exists: !!exists });
  } catch (err) {
    console.error('Email check error:', err);
    res.status(500).json({ message: 'Error checking email', error: err.message });
  }
};

// ✅ Organizer Login — Disabled (optional)
exports.loginOrganizer = (req, res) => {
  res.status(501).json({ message: 'Login disabled. Password is not required.' });
};
