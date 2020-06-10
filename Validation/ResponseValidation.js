const validator = require("validator");

class ResponseValidation {
    insert(req, res) {
        if (req == undefined) {
            let response = {
                "name": "ErroProcessoInsert",
                "errors":[{
                    "message": "Bad Request"
                }]
            };
            throw response;
        }

        res.status(201);
    }

    detalhes(req, res) {
        if (req == undefined) {
            let response = {
                "name": "ProcessoDetalhes",
                "errors":[{
                    "message": "Not Found"
                }]
            };

            return res.status(404).json(response);
        }

        res.status(200).json(req);
    }

    update(req, res) {
        if (req == 0) {
            let response = {
                "name": "ProcessoUpdate",
                "errors":[{
                    "message": "Not Found"
                }]
            };

            return res.status(404).json(response);
        }

        res.status(200).send("Atualizado");
    }

    delete(req, res) {
        if (req == 0) {
            let response = {
                "name": "ProcessoDelete",
                "errors":[{
                    "message": "Not Found"
                }]
            };

            return res.status(404).json(response);
        }

        res.statusCode = 200;
        res.send("Deletado");
    }

//Verifica se é um parametro numerico
    validaNumber (req, res) {
        if (isNaN(req)) {
            throw res.status(404).send("Not Found");
        }
        return true;
    }
    
//Verifica se é um parametro string
    validaString (req, res) {
        if (!isNaN(req)) {
            throw res.status(404).send("Not Found");
        }
        return true;
    }
}

module.exports = new ResponseValidation();