import express from "express";
import { getRandomCard } from "../controllers/cardController.js"; // Add `.js` extension for ES modules

const router = express.Router();

router.get("/cards/random", getRandomCard);

export default router; // Use `export default` instead of `module.exports`
