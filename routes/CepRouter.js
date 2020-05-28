const express = require("express");
const router = express.Router();
const CepController = require("../controllers/CepController");

router.get("/cep", CepController.index);

router.post("/cep", CepController.create);

router.get("/cep/:id", CepController.detals);

router.put("/cep/:id", CepController.update);

router.delete("/cep/:id", CepController.delete);


module.exports = router;