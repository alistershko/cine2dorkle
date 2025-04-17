const express = require("express");
const TMDBController = require("../controllers/tmdb");

const router = express.Router();

router.get("/initialMovie", TMDBController.getRandomMovie);
router.get("/cast/:id", TMDBController.getCastFromMovieId);
router.get("/search/:name", TMDBController.getSearchResults)

module.exports = router;