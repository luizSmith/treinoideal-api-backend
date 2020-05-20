const express = require("express");
const router = express.Router();
const UfController = require("../controllers/UfController");

router.get("/uf", UfController.index);

router.get("/uf/:id", UfController.detals);

module.exports = router;