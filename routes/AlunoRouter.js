const express = require("express");
const router = express.Router();
const AlunoController = require("../controllers/AlunoController");

router.get("/aluno", AlunoController.index);

router.post("/aluno", AlunoController.create);

router.get("/aluno/:id", AlunoController.detals);

router.put("/aluno/:id", AlunoController.update);

//router.delete("/aluno/:id", AlunoController.delete);

module.exports = router;
