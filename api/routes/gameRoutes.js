const express = require("express");
const gameController = require("../controllers/GameController");

const router = express.Router();

router.get("/gameStart", gameController.startNewGame);

module.exports = router;