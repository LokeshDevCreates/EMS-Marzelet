const BankDetails = require("../models/BankDetails");

const checkBankDetails = async (req, res, next) => {
  const organizerId = req.body.organizerId || req.user?.id;
  if (!organizerId) return res.status(400).json({ message: 'Organizer ID is required' });

  const bank = await BankDetails.findOne({ organizerId });
  if (!bank || !bank.razorpayFundAccountId) {
    return res.status(403).json({ message: "Bank details not submitted. Cannot create event." });
  }
  next();
};

module.exports = checkBankDetails;
