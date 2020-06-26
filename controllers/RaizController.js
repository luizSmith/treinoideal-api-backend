const PersonalService = require("../services/PersonalService");
const TokenService = require("../services/TokenService");
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
}

module.exports = new RaizController();