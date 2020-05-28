const AparelhoService = require("../services/AparelhoService");
const ResponseValidation = require("../Validation/ResponseValidation");
class AparelhoController {

    async index(req, res) {
        try {
            let result = await AparelhoService.lista();
            res.statusCode = 200;
            res.json(result);
        } catch (err) {
            res.statusCode = 400;
            res.json({erro:err})
        }
    }

    async detals(req, res) {
        let id = req.params.id;

        if (isNaN(id)) {
            res.statusCode = 404;
            return res.send("Not Found");
        }

        try {
            let result = await AparelhoService.detalhes(id);
            ResponseValidation.detalhes(result,res);
        } catch (err) {
            res.statusCode = 400;
            res.json({erro:err})
        }
    }

}

module.exports = new AparelhoController();