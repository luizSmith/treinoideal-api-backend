const CepService = require("../services/CepService");
const ResponseValidation = require("../Validation/ResponseValidation");
const validator = require("validator");
class CepController {
    async create(req, res) {
        let {cep, longra, bairro, cidade, uf} = req.body;

        let endereco = {
            cod:cep,
            longra,
            bairro,
            cidade,
            uf
        };

        try {
            let estado = await CepService.verificaUF(uf);

            let result = await CepService.insert(endereco);

            result = {...result,...estado};

            await ResponseValidation.insert(result,res);

            res.json(result);
        } catch(err) {
            res.status(400).json(err);
        }
        
    }

    async index(req, res) {
        try {
            let result = await CepService.lista();

            res.status(200).json(result);
        } catch (err) {
            res.status(400).json(err);
        }
    }

   async detals(req, res) {
        let id = req.params.id;

        try {

            await ResponseValidation.validaNumber(id,res);

            let result = await CepService.detalhes(id);

            await ResponseValidation.detalhes(result,res);

        } catch (err) {
            res.status(400).json(err);
        }
    }

    async update(req, res) {
        let id = req.params.id;

        let {longra, bairro, cidade, uf} = req.body;

        let dados = {
            nm_longradouro:longra,
            nm_bairro:bairro,
            nm_cidade:cidade,
            sg_uf:uf
        };

        try {
            await ResponseValidation.validaNumber(id,res);

            let estado = {};
            
            if (uf != undefined) {
                estado = await CepService.verificaUF(uf);
            }       

            let result = await CepService.atualiza(id,dados);

            result = {...result,...estado};

            await ResponseValidation.update(result,res);
        } catch (err) {
            res.status(400).json(err);
        }
    }

    async delete(req, res) {
        let id = req.params.id;

        try {
            await ResponseValidation.validaNumber(id,res);

            let result = await CepService.deleta(id);

            await ResponseValidation.delete(result,res);
        } catch (err) {
            res.status(400).json(err);
        }
    }
}

module.exports = new CepController();