const express = require("express");
const router = express.Router();
const PersonalAlunoController = require("../controllers/PersonalAlunoController");
const loginAuth = require("../middlewares/Token");

router.get("/associacao",loginAuth, PersonalAlunoController.index);

//router.get("/associacao/:id", PersonalAlunoController.detals);

module.exports = router;