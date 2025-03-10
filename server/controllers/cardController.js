const pool = require("../models/db");

exports.getRandomCard = async (req, res) => {
  try {
    console.log("Incoming request query:", req.query);

    const { part } = req.query;
    if (!part) return res.status(400).json({ error: "Missing part type" });

    console.log("✔️ Received part:", part);

    // Fetch rarity distribution
    const rarityQuery = `SELECT rarity, probability FROM rarity_distribution`;
    const [rows] = await pool.query(rarityQuery);//array or object?

    console.log("✔️ Fetched rarity data:", rows); // ✅ Should now display correctly

    if (!rows || rows.length === 0) {
      console.error("❌ ERROR: No rarity data found in rarity_distribution.");
      return res.status(500).json({ error: "Rarity data missing" });
    }

    let rarityPool = [];
    rows.forEach(row => {
      let count = Math.floor(row.probability * 1000);
      if (isNaN(count) || count <= 0) {
        console.warn(`Invalid probability value for rarity: ${row.rarity}`);
        return;
      }
      for (let i = 0; i < count; i++) {
        rarityPool.push(row.rarity);
      }
    });

    console.log("✔️ Rarity Pool Generated:", rarityPool.length, "entries");

    const selectedRarity = rarityPool[Math.floor(Math.random() * rarityPool.length)];
    console.log("🎲 Selected Rarity:", selectedRarity);

    // Fetch a random card
    const cardQuery = `
      SELECT * FROM cards
      WHERE part = $1 AND rarity = $2
      ORDER BY RANDOM()
      LIMIT 1;
    `;
    // Destructure the result; Sequelize returns [results, metadata]
    const [results] = await pool.query(cardQuery, { replacements: [part, selectedRarity] });

    console.log("✔️ Card Query Result:", results);

    if (!results || results.length === 0) {
      console.warn(`⚠️ No cards found for part="${part}" and rarity="${selectedRarity}"`);
      return res.status(404).json({ error: "No card found" });
    }

    res.json(results[0]);


  } catch (error) {
    console.error("❌ Server error fetching random card:", error);
    res.status(500).json({ error: "Server error" });
  }
};
