const express = require("express");
const router = express.Router();
const PersonalAlunoController = require("../controllers/PersonalAlunoController");

router.get("/associacao", PersonalAlunoController.index);

//router.get("/associacao/:id", PersonalAlunoController.detals);

module.exports = router;