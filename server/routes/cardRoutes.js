const express = require("express");
const router = express.Router();
const Card = require("../models/Card"); // Ensure this matches the module export

router.get("/cards", async (req, res) => {
  try {
    const cards = await Card.findAll();
    res.json(cards);
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
