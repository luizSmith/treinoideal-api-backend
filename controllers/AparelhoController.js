const AparelhoService = require("../services/AparelhoService");
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
            return res.json({erro:"Parametro indefinido"})
        }

        try {
            let result = await AparelhoService.detalhes(id);
            res.statusCode = 200;
            res.json(result);
        } catch (err) {
            res.statusCode = 400;
            res.json({erro:err})
        }
    }

}

module.exports = new AparelhoController();