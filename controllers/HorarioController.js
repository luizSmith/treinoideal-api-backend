const HorarioService = require("../services/HorarioService");
const ResponseValidation = require("../Validation/ResponseValidation");

class HorarioController {

    async index(req, res) {
        try {
            let result = await HorarioService.lista();
            res.statusCode = 200;
            res.json(result);
        } catch (err) {
            res.statusCode = 400;
            res.json({erro:err})
        }
    }

    async create(req, res) {
        let {
            aluno,
            personal,
            hora_inicial,
            hora_final,
            dia_semana,
            disponivel
        } = req.body;

        let horario = {
            aluno,
            personal,
            hora_inicial,
            hora_final,
            dia_semana,
            disponivel
        };

        try {
            let result = await HorarioService.insert(horario);
            res.statusCode = 201;
            res.json(result);
        } catch(err) {
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
            let result = await HorarioService.detalhes(id);
            await ResponseValidation.detalhes(result,res);
        } catch (err) {
            res.statusCode = 400;
            res.json({erro:err})
        }
    }

    async update(req, res) {
        let id = req.params.id;

        if (isNaN(id)) {
            res.statusCode = 404;
            return res.send("Not Found");
        }

        let {
            aluno,
            personal,
            hora_inicial,
            hora_final,
            dia_semana,
            disponivel
        } = req.body;

        let dados = {
            aluno,
            personal,
            hora_inicial,
            hora_final,
            dia_semana,
            disponivel
        }

        try {
            let result = await HorarioService.atualiza(id,dados);
            await ResponseValidation.update(result,res);
        } catch (err) {
            res.statusCode = 400;
            res.json({erro:err})
        }
    }

    async delete(req, res) {
        let id = req.params.id;

        if (isNaN(id)) {
            res.statusCode = 404;
            return res.send("Not Found");
        }

        try {
            let result = await HorarioService.deleta(id);
            await ResponseValidation.delete(result,res);
        } catch (err) {
            res.statusCode = 400;
            res.json({erro:err})
        }
    }

}

module.exports = new HorarioController();