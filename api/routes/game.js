const express = require("express");
const GameController = require("../controllers/game");

const router = express.Router();

router.get("/initialMovie", GameController.getRandomMovie);
router.get("/cast/:id", GameController.getCastFromMovieId)

module.exports = router;