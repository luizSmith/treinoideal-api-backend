const express = require("express");
const router = express.Router();
const PersonalController = require("../controllers/PersonalController");

router.get("/personal", PersonalController.index);

router.post("/personal", PersonalController.create);

module.exports = router;