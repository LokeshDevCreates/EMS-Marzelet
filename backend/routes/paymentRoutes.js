const express = require("express");
const router = express.Router();
const { createOrder, verifyPayment } = require("../controllers/paymentController.js");
router.post("/create-order", createOrder);
router.post("/verify", verifyPayment);
module.exports = router;