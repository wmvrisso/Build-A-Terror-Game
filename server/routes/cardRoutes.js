const express = require("express");
const router = express.Router();
const { Card } = require("../models");

// Get a random card of a specific part type
router.get("/random", async (req, res) => {
  try {
    const { part } = req.query;
    if (!["Head", "Body", "Legs"].includes(part)) {
      return res.status(400).json({ error: "Invalid part type" });
    }

    const card = await Card.findOne({
      where: { part: part },
      order: [["id", "RANDOM"]],
    });

    res.json(card);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch random card" });
  }
});

module.exports = router;
