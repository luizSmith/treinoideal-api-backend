const express = require("express");
const router = express.Router();
const PersonalController = require("../controllers/PersonalController");

router.get("/personal", PersonalController.index);

router.post("/personal", PersonalController.create);

router.get("/personal/:id", PersonalController.detals);

router.put("/personal/:id", PersonalController.update);

router.delete("/personal/:id", PersonalController.delete);

module.exports = router;