const express = require("express");
const router = express.Router();
const { validateBankDetails, saveBankDetails } = require("../controllers/bankDetailsController.js");
router.post("/", validateBankDetails, saveBankDetails);
module.exports = router;