const express = require("express");
const router = express.Router();
const { Card } = require("../models");

// GET all cards (full deck)
router.get("/", async (req, res) => {
  try {
    const cards = await Card.findAll();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cards" });
  }
});

// GET a shuffled deck
router.get("/shuffle", async (req, res) => {
  try {
    const cards = await Card.findAll();
    
    // Fisher-Yates Shuffle
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: "Failed to shuffle deck" });
  }
});

module.exports = router;
