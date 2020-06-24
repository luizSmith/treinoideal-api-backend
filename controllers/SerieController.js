const ResponseValidation = require("../Validation/ResponseValidation");
const SerieService = require("../services/SerieService");

class SerieController {

    async index (req, res) {
        try {
            let result = await SerieService.lista();
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json(err);
        }
    }

    async create (req, res) {
        let {aula, exercicio, repeticao, peso} = req.body;

        let serie = {
            aula,
            exercicio,
            repeticao,
            peso
        };

        try {
            let result = await SerieService.insert(serie);
            await ResponseValidation.insert(result,res);
            res.json(result);
        } catch(err) {
            res.status(400).json(err);
        }
    }
}

module.exports = new SerieController();