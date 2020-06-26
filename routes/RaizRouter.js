const express = require("express");
const router = express.Router();
const RaizController = require("../controllers/RaizController");
const loginAuth = require("../middlewares/Token");

router.post('/login', RaizController.login);

router.get("/dados", loginAuth, RaizController.detals);

router.get("/logout", RaizController.delete);

module.exports = router;