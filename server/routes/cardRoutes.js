const express = require("express");
const router = express.Router();
const { Card } = require("../models");

router.get("/", async (req, res) => {
  const cards = await Card.findAll();
  res.json(cards);
});

router.post("/", async (req, res) => {
  const { name, image } = req.body;
  const newCard = await Card.create({ name, image });
  res.json(newCard);
});

module.exports = router;
