const Organizer = require('../models/organizer');

// Generate customOrganizerId in the format "OG10001", "OG10002", ...
const generateOrganizerId = async () => {
  try {
    const last = await Organizer.findOne().sort({ createdAt: -1 });

    // Extract numeric part of last ID or start from 10000
    const lastNumericId = last?.customOrganizerId?.slice(2) || "10000";
    let newId = String(parseInt(lastNumericId) + 1);

    // Ensure uniqueness
    while (await Organizer.findOne({ customOrganizerId: `OG${newId}` })) {
      newId = String(parseInt(newId) + 1);
    }

    return `OG${newId}`;
  } catch (err) {
    console.error('Failed to generate organizer ID:', err);
    throw new Error('Failed to generate unique Organizer ID');
  }
};

module.exports = generateOrganizerId;