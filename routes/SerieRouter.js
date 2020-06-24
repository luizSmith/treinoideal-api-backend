const express = require("express");
const router = express.Router();
const SerieController = require("../controllers/SerieController");

router.get("/serie", SerieController.index);

router.post("/serie", SerieController.create);

// router.get("/aparelho/:id", AparelhoController.detals);

module.exports = router;