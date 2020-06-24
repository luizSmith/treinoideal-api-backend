const ExercicioService = require("../services/ExercicioService");
const ResponseValidation = require("../Validation/ResponseValidation");

class ExercicioController {

    async index(req, res) {
        try {
            let result = await ExercicioService.lista();
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json(err);
        }
    }

    async detals(req, res) {
        let id = req.params.id;

        try {
            await ResponseValidation.validaNumber(id,res);

            let result = await ExercicioService.detalhes(id);
            ResponseValidation.detalhes(result,res);
        } catch (err) {
            res.status(400).json(err);
        }
    }

}

module.exports = new ExercicioController();