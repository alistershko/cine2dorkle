const express = require("express");
const gameController = require("../controllers/game_controller");

const router = express.Router();

router.get("/gameStart", gameController.startNewGame);

module.exports = router;