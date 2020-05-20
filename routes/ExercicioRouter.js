const express = require("express");
const router = express.Router();
const ExercicioController = require("../controllers/ExercicioController");

router.get("/exercicio", ExercicioController.index);

router.get("/exercicio/:id", ExercicioController.detals);

module.exports = router;