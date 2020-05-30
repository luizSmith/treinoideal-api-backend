const express = require("express");
const router = express.Router();
const HorarioController = require("../controllers/HorarioController");

router.get("/horario", HorarioController.index);

router.post("/horario", HorarioController.create);

router.get("/horario/:id", HorarioController.detals);

router.put("/horario/:id", HorarioController.update);

router.delete("/horario/:id", HorarioController.delete);

module.exports = router;