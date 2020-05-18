const express = require("express");
const router = express.Router();
const PersonalController = require("../controllers/PersonalController");

router.get("/personal", PersonalController.index);

module.exports = router;