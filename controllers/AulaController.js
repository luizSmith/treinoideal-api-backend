const AulaService = require("../services/AulaService");
const HorarioService = require("../services/HorarioService");
const ResponseValidation = require("../Validation/ResponseValidation");

class AulaController {
    async index(req, res) {
        try {
            let result = await AulaService.lista();
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json(err);
        }
    }

    async detals(req, res) {
        let {id} = req.params;

        try {
            await ResponseValidation.validaNumber(id,res);

            let result = await AulaService.detalhes(id);
            await ResponseValidation.detalhes(result,res);
        } catch (err) {
            res.status(400).json(err);
        }
    }

    async create(req, res) {
        let {data,horario} = req.body;
        let {personal} = req.headers;

        let aula = {
            data,
            horario
        };

        let hora = {
            personal,
            horario
        }

        try {
            await HorarioService.verifica_horario(hora);

            let result = await AulaService.insert(aula);
            res.status(201).json(result);
        } catch(err) {
            res.status(400).json(err);
        }
    }

    async update(req, res) {
        let {id} = req.params;
        let {personal} = req.headers;

        let {data,horario,feito} = req.body;

        let aula = {
            data,
            horario,
            feito
        };

        let hora = {
            personal,
            horario
        }

        try {
            await ResponseValidation.validaNumber(id,res);

            await HorarioService.verifica_horario(hora);

            let result = await AulaService.atualiza(id,aula);
            await ResponseValidation.update(result,res);
        } catch (err) {
            res.status(400).json(err);
        }
    }

    async delete(req, res) {
        let {id} = req.params;

        try {
            await ResponseValidation.validaNumber(id,res);

            let result = await AulaService.deleta(id);
            await ResponseValidation.delete(result,res);
        } catch (err) {
            res.status(400).json(err);
        }
    }
}

module.exports = new AulaController();