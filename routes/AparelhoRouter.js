const express = require("express");
const router = express.Router();
const AparelhoController = require("../controllers/AparelhoController");

router.get("/aparelho", AparelhoController.index);

router.get("/aparelho/:id", AparelhoController.detals);

module.exports = router;