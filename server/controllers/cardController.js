const pool = require("../models/db");

console.log("Incoming request query:", req.query);

exports.getRandomCard = async (req, res) => {
  try {
    const { part } = req.query;
    if (!part) return res.status(400).json({ error: "Missing part type" });

    const rarityQuery = `SELECT rarity, probability FROM rarity_distribution`;
    const rarityResults = await pool.query(rarityQuery);

    if (rarityResults.rows.length === 0) {
      console.error("ERROR: No rarity data found in rarity_distribution.");
      return res.status(500).json({ error: "Rarity data missing" });
    }

    let rarityPool = [];
    rarityResults.rows.forEach(row => {
      let count = Math.floor(row.probability * 1000);
      if (isNaN(count) || count <= 0) {
        console.warn(`Invalid probability value for rarity: ${row.rarity}`);
        return;
      }
      for (let i = 0; i < count; i++) {
        rarityPool.push(row.rarity);
      }
    });

    // Select a random rarity from the pool
    const selectedRarity = rarityPool[Math.floor(Math.random() * rarityPool.length)];

    // Fetch a random card using correct column names
    const cardQuery = `
      SELECT * FROM cards
      WHERE part = $1 AND rarity = $2
      ORDER BY RANDOM()
      LIMIT 1;
    `;
    const cardResult = await pool.query(cardQuery, [part, selectedRarity]);

    if (cardResult.rows.length === 0) {
      console.warn(`No cards found for part="${part}" and rarity="${selectedRarity}"`);
      return res.status(404).json({ error: "No card found" });
    }

    res.json(cardResult.rows[0]);
  } catch (error) {
    console.error("Server error fetching random card:", error);
    res.status(500).json({ error: "Server error" });
  }
};
