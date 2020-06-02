const express = require("express");
const router = express.Router();
const AulaController = require("../controllers/AulaController");

router.get("/aula", AulaController.index);

router.post("/aula", AulaController.create);

router.get("/aula/:id", AulaController.detals);

router.put("/aula/:id", AulaController.update);

router.delete("/aula/:id", AulaController.delete);

module.exports = router;