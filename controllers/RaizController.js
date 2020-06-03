const PersonalService = require("../services/PersonalService");
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
                expiresIn: '1h' // expires in 60min
                //expiresIn: '1min' // expires in 2,5 min
            });

            res.status(200).send({
                auth: true, 
                token: token
            });

        } catch(erro) {
            res.status(400).send(erro);
        }
    }

    async detals(req, res) {
        res.send('oi');
    }

    async delete(req, res) {
        let token = req.headers['x-access-token'];
        //await jwt.destroy(token);
        res.status(200).send({ auth: false, token: null });
    }
}

module.exports = new RaizController();