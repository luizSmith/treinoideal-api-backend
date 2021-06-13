const express = require("express");
const router = express.Router();

const loginAuth = require("../middlewares/Token");

const HorarioController = require("../controllers/HorarioController");

router.get("/horario", loginAuth, HorarioController.index);

router.post("/horario", loginAuth, HorarioController.create);

router.get("/horario/:id", loginAuth, HorarioController.detals);

router.put("/horario/:id", loginAuth, HorarioController.update);

router.delete("/horario/:id/associacao/:associacao", loginAuth, HorarioController.delete);

module.exports = router;