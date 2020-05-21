const ExercicioService = require("../services/ExercicioService");
const validator = require("validator");
class ExercicioController {

    async index(req, res) {
        try {
            let result = await ExercicioService.lista();
            res.statusCode = 200;
            res.json(result);
        } catch (err) {
            res.statusCode = 400;
            res.json({erro:err})
        }
    }

    async detals(req, res) {
        let id = req.params.id;

        if (validator.isEmpty(id)) {
            res.statusCode = 404;
            return res.json({erro:"Parametro indefinido"})
        }

        try {
            let result = await ExercicioService.detalhes(id);
            res.statusCode = 200;
            res.json(result);
        } catch (err) {
            res.statusCode = 400;
            res.json({erro:err})
        }
    }

}

module.exports = new ExercicioController();