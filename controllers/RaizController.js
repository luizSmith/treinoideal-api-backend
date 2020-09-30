const PersonalService = require("../services/PersonalService");
const AlunoService = require("../services/AlunoService");
const TokenService = require("../services/TokenService");
const Gerator = require('../Validation/GerarPasswordValidation');
const ResponseValidation = require("../Validation/ResponseValidation");
const EmailValidation = require("../Validation/EmailValidation");
const jwt = require('jsonwebtoken');
require("dotenv-safe").config();


class RaizController {
    async login(req, res) {
        let {email,senha} = req.body;
        let personal = {
            email,
            senha
        };

        try {
                       
            let result = await PersonalService.findPersonal(personal);
            let token = await jwt.sign(result, process.env.SECRET, {
                //expiresIn: '1h' // expires in 60min
                //expiresIn: '1min' // expires in 2,5 min
            });

            await TokenService.insert(token);

            res.status(200).send({
                auth: true,
                //codigo:result.codigo,
                token: token
            });

        } catch(erro) {
            res.status(400).send(erro);
        }
    }

    async detals(req, res) {
        try {
            let personal = req.headers['dados_user'];

            let dados = await PersonalService.detalhes(personal.codigo);

            ResponseValidation.detalhes(dados, res);   
        } catch(erro) {
            res.status(400).send(erro);
        }             
    }

    async delete(req, res) {
        let token = req.headers['x-access-token'];

        try {

            await TokenService.desativa_log(token);
            res.status(200).send({ auth: false, token: null });

        } catch (erro) {
            res.status(400).send(erro);
        } 
    }

    async esqueciPersonal(req, res) {
        let {personal_id, email} = req.body;
        
        try {      
            let novaSenha = await Gerator.gerar();
            
            await PersonalService.atualizaSenha(personal_id, {senha: novaSenha});

            let corpo = `
                <h2> Nova senha: </h2> <h1> ${novaSenha} </h1>
            `;

            await EmailValidation.enviarEmail(corpo,email);

            res.status(204).send(true);
        } catch (erro) {
            res.status(400).json({err:erro});
        }
    }

    async esqueciAluno(req, res) {
        let {aluno_id, email} = req.body;
        
        try {      
            let novaSenha = await Gerator.gerar();
            
            await AlunoService.atualizaSenha(aluno_id, {senha: novaSenha});

            let corpo = `
                <h2> Nova senha: </h2> <h1> ${novaSenha} </h1>
            `;

            await EmailValidation.enviarEmail(corpo,email);

            res.status(204).send(true);
        } catch (erro) {
            res.status(400).json({err:erro});
        }
    }
}

module.exports = new RaizController();