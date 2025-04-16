const express = require("express");
const GameController = require("../controllers/game");

const router = express.Router();

router.get("/initialMovie", GameController.getRandomMovie);

module.exports = router;