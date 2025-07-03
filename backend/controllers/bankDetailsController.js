const BankAccount = require("../models/BankDetails");

const validateBankDetails = (req, res, next) => {
  const { bankName, accountHolderName, accountNumber, ifscCode } = req.body;
  if (!bankName || !accountHolderName || !accountNumber || !ifscCode) {
    return res.status(400).json({ message: "All fields are required." });
  }
  next();
};

const saveBankDetails = async (req, res) => {
  const { organizerId, bankName, accountHolderName, accountNumber, ifscCode } = req.body;
  try {
    const newBank = new BankAccount({
      organizerId,
      bankName,
      accountHolderName,
      accountNumber,
      ifscCode,
    });
    await newBank.save();
    res.status(201).json({
      message: "Bank details saved successfully for manual payout."
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to save bank details.",
      error: err.message,
    });
  }
};
module.exports = { validateBankDetails, saveBankDetails };