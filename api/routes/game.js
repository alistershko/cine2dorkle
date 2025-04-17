const express = require("express");
const GameController = require("../controllers/game");

const router = express.Router();

router.get("/initialMovie", GameController.getRandomMovie);
router.get("/cast/:id", GameController.getCastFromMovieId);
router.get("search/:name", GameController.getSearchResults)

module.exports = router;