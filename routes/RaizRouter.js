const express = require("express");
const router = express.Router();
const RaizController = require("../controllers/RaizController");
const loginAuth = require("../middlewares/Token");
const ValidaSenhaPersonal = require("../middlewares/ValidaSenhaPersonal");
const ValidaSenhaAluno = require("../middlewares/ValidaSenhaAluno");

router.post('/login', RaizController.login);

router.get("/dados", loginAuth, RaizController.detals);

router.get("/logout", RaizController.delete);

router.post("/esqueci/personal", ValidaSenhaPersonal, RaizController.esqueciPersonal);

router.post("/esqueci/aluno", ValidaSenhaAluno, RaizController.esqueciAluno);

module.exports = router;