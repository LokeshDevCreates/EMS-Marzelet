// models/BankDetails.js
const mongoose = require("mongoose");
const BankDetailsSchema = new mongoose.Schema({
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bankName: String,
  accountHolderName: String,
  accountNumber: String,
  ifscCode: String
});
module.exports = mongoose.model("BankDetails", BankDetailsSchema);