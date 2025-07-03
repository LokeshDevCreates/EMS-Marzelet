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

// ✅ Organizer Registration
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

    // Validate phone number
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ message: 'Phone number must be 10 digits' });
    }

    // Check if email already registered
    const existing = await Organizer.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Generate custom Organizer ID
    const customOrganizerId = await generateOrganizerId();

    // Handle profile image if uploaded
    const profileImage = req.files?.profileImage?.[0]?.path.replace(/\\/g, '/') || null;


    // Create new organizer
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

    const saved = await newOrganizer.save();

    // Send confirmation email
    await sendEmail(email, customOrganizerId);

    res.status(201).json({
      message: 'Registration successful',
      organizerId: customOrganizerId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Registration failed',
      error: err.message,
    });
  }
};

// ✅ Organizer Login (Optional — leave as is if not used)
exports.loginOrganizer = async (req, res) => {
  res.status(501).json({ message: 'Login disabled. Password is not required.' });
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
      email,
      phone,
      organizationType,
      organizationName,
      profession,
      description
    } = req.body;

    const updatedOrganizer = await Organizer.findByIdAndUpdate(
      id,
      { name, email, phone, organizationType, organizationName, profession, description },
      { new: true }
    );

    if (!updatedOrganizer) {
      return res.status(404).json({ message: 'Organizer not found' });
    }

    res.status(200).json(updatedOrganizer);
  } catch (err) {
    console.error('Error updating organizer:', err);
    res.status(500).json({ message: 'Failed to update organizer', error: err.message });
  }
};
// ✅ Check Organizer By Email
exports.checkOrganizerByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const organizer = await Organizer.findOne({ email });
    if (!organizer) {
      return res.status(404).json({ exists: false });
    }
    res.status(200).json({ exists: true });
  } catch (err) {
    console.error('Error checking organizer by email:', err);
    res.status(500).json({ message: 'Error checking email', error: err.message });
  }
};

// ✅ Delete Organizer
exports.deleteOrganizer = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrganizer = await Organizer.findByIdAndDelete(id);

    if (!deletedOrganizer) {
      return res.status(404).json({ message: 'Organizer not found' });
    }

    res.status(200).json({ message: 'Organizer deleted successfully' });
  } catch (err) {
    console.error('Error deleting organizer:', err);
    res.status(500).json({ message: 'Failed to delete organizer', error: err.message });
  }
};
// ✅ Get Organizer by Email (for storing ID after registration)
exports.getOrganizerByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const organizer = await Organizer.findOne({ email });
    if (!organizer) {
      return res.status(404).json({ message: "Organizer not found" });
    }
    res.status(200).json(organizer); // return full organizer
  } catch (err) {
    console.error("Error checking organizer by email:", err);
    res.status(500).json({ message: "Error checking email", error: err.message });
  }
};
