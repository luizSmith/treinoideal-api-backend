const PlansService = require("../services/PersonalService");
const bcrypt = require('bcryptjs');
class PersonalController {
    index(req, res) {
        res.send("olá");
    }

    async create(req, res) {
        let {nome, email, senha, data, cref} = req.body;

        let salt = bcrypt.genSaltSync(10);
        senha = bcrypt.hashSync(senha,salt);

        let per = {
            nome,
            email,
            senha,
            data,
            cref
        };

        try {
            let result = await PlansService.insert(per);
            res.statusCode = 201;
            res.json({
                codigo:result.cd_personal,
                nome:result.nm_personal,
                email:result.nm_email
            });
        } catch(err) {
            res.statusCode = 400;
            res.json({erro:err})
        }
        
    }
}

module.exports = new PersonalController();