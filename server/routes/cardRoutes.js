const express = require("express");
const router = express.Router();
const { getRandomCard } = require("../controllers/cardController");

router.get("/cards/random", async (req, res) => {
  const { part } = req.query;
  if (!part) return res.status(400).json({ error: "Missing part type" });

  try {
    const card = await getRandomCard(part);
    if (!card) {
      return res.status(404).json({ error: "No cards available for this part type" });
    }
    res.json(card);
  } catch (error) {
    console.error("Error fetching card:", error);
    res.status(500).json({ error: "Failed to fetch card" });
  }
});

module.exports = router;