const express = require("express");
const router = express.Router();
const AulaController = require("../controllers/AulaController");
const loginAuth = require("../middlewares/Token");

router.get("/aula", AulaController.index);

router.post("/aula", loginAuth, AulaController.create);

router.get("/aula/:id", AulaController.detals);

router.put("/aula/:id", loginAuth, AulaController.update);

router.delete("/aula/:id", AulaController.delete);

module.exports = router;