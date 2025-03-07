const pool = require("../models/db");

// Get a random card based on part type and rarity
exports.getRandomCard = async (req, res) => {
  try {
    const { part } = req.query;
    if (!part) return res.status(400).json({ error: "Missing part type" });

    // Fetch rarity distribution
    const rarityQuery = `SELECT rarity, probability FROM rarity_distribution`;
    const rarityResults = await pool.query(rarityQuery);

    let rarityPool = [];
    rarityResults.rows.forEach(row => {
      let count = Math.floor(row.probability * 1000);
      for (let i = 0; i < count; i++) {
        rarityPool.push(row.rarity);
      }
    });

    const selectedRarity = rarityPool[Math.floor(Math.random() * rarityPool.length)];

    // Fetch a random card that matches the rarity and part type
    const cardQuery = `
      SELECT * FROM cards
      WHERE part = $1 AND rarity = $2
      ORDER BY RANDOM()
      LIMIT 1;
    `;
    const cardResult = await pool.query(cardQuery, [part, selectedRarity]);

    if (cardResult.rows.length === 0) {
      return res.status(404).json({ error: "No card found" });
    }

    res.json(cardResult.rows[0]);
  } catch (error) {
    console.error("Error fetching random card:", error);
    res.status(500).json({ error: "Server error" });
  }
};
