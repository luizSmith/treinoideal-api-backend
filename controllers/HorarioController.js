const HorarioService = require("../services/HorarioService");
const ResponseValidation = require("../Validation/ResponseValidation");

class HorarioController {

    async index(req, res) {
        let {id} = req.headers;

        try {
            await ResponseValidation.validaNumber(id,res);

            let result = await HorarioService.lista(id);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json(err);
        }
    }

    async create(req, res) {
        let {
            associacao,
            hora_inicial,
            hora_final,
            dia_semana,
        } = req.body;

        let horario = {
            associacao,
            hora_inicial,
            hora_final,
            dia_semana,
        };

        try {
            await HorarioService.verifica_horario_insert(horario);

            let result = await HorarioService.insert(horario);

            await ResponseValidation.insert(result,res);
            res.json(result);
        } catch(err) {
            res.status(400).json(err);
        }
        
    }
    
    async detals(req, res) {
        let {id} = req.params;

        try {
            await ResponseValidation.validaNumber(id,res);

            let result = await HorarioService.detalhes(id);
            await ResponseValidation.detalhes(result,res);
        } catch (err) {
            res.status(400).json(err);
        }
    }

    async update(req, res) {
        let {id} = req.params;

        let {
            associacao,
            hora_inicial,
            hora_final,
            dia_semana,
            disponivel
        } = req.body;

        let dados = {
            associacao,
            hora_inicial,
            hora_final,
            dia_semana,
            disponivel
        }

        try {
            await ResponseValidation.validaNumber(id,res);

            await HorarioService.verifica_horario_update(id,dados);

            let result = await HorarioService.atualiza(id,dados);
            await ResponseValidation.update(result,res);
        } catch (err) {
            res.status(400).json(err);
        }
    }

    async delete(req, res) {
        let {id, associacao} = req.params;

        try {
            await ResponseValidation.validaNumber(id,res);
            await ResponseValidation.validaNumber(associacao,res);

            let result = await HorarioService.deleta(id,associacao);
            await ResponseValidation.delete(result,res);
        } catch (err) {
            res.status(400).json(err);
        }
    }

}

module.exports = new HorarioController();