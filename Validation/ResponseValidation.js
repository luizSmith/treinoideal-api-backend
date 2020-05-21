const validator = require("validator");

class ResponseValidation {
    insert(req, res) {
        if (req == undefined) {
            throw "Bad Request";
        }

        res.statusCode = 201;
    }

    detalhes(req, res) {
        if (req == undefined) {
            res.statusCode = 404;
            res.send("Not Found");
        }

        res.statusCode = 200;
        res.json(req);
    }

    update(req, res) {
        if (req == 0) {
            res.statusCode = 404;
            return res.send("Not Found");
        }

        res.statusCode = 202;
        res.send("Atualizado");
    }

    delete(req, res) {
        if (req == 0) {
            res.statusCode = 404;
            return res.send("Not Found");
        }

        res.statusCode = 202;
        res.send("Deletado");
    }


}

module.exports = new ResponseValidation();