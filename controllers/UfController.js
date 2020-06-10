const UfService = require("../services/UfService");
const validator = require("validator");
const ResponseValidation = require("../Validation/ResponseValidation");
class UfController {

    async index(req, res) {
        try {
            let result = await UfService.lista();
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json(err);
        }
    }

    async detals(req, res) {
        let id = req.params.id;

        try {
            await ResponseValidation.validaString(id,res);
            
            let result = await UfService.detalhes(id);
            await ResponseValidation.detalhes(result,res);
        } catch (err) {
            res.status(400).json(err);
        }
    }

}

module.exports = new UfController();