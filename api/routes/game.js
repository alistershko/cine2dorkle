const express = require("express");
const gameController = require("../controllers/GameController");

const router = express.Router();

router.get("/gameStart", gameController.startNewGame);
router.get("/:id", gameController.getGameObject);
router.post("/guess", gameController.processGuess);

module.exports = router;
