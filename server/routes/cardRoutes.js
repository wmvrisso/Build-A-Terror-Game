const express = require("express");
const router = express.Router();
const { getRandomCard } = require("../controllers/cardController");

router.get("/cards/random", getRandomCard);

module.exports = router;