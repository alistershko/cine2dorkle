const express = require("express");
const gameController = require("../controllers/gameController");

const router = express.Router();

router.get("/gameStart", gameController.startNewGame);
router.get("/:id", gameController.getGame);

module.exports = router;