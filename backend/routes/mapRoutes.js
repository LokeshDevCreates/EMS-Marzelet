// routes/maps.js
const express = require("express");
const router = express.Router();
const axios = require("axios");
const dotenv=require("dotenv")
dotenv.config();
// Use your secret API key from .env
const GOOGLE_API_KEY = process.env.GOOGLE_MAP_API_KEY;
router.get("/geocode", async (req, res) => {
  const { lat, lng } = req.query;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          latlng: `${lat},${lng}`,
          key: GOOGLE_API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Google Maps API error:", error.message);
    res.status(500).json({ error: "Failed to fetch geocode data" });
  }
});

module.exports = router;
