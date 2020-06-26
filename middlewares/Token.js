const jwt = require('jsonwebtoken');
require("dotenv-safe").config();
const RaizController = require("../controllers/RaizController");
const TokenService = require("../services/TokenService");
async function verifyJWT(req, res, next){
    let token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).send({
            "name": "AutenticacaoFalha",
            "errors":[{
                "message": "No token provided"
            }]
        });
    }
    
    try {

        let valida = await jwt.verify(token, process.env.SECRET);
        await TokenService.findToken(token);

        //res.json(valida);
             
        next();

    } catch (erro) {
        console.log(erro);
        res.status(500).send({
            auth: false, 
            message: 'Failed to authenticate token.' 
        });
    }
}

module.exports = verifyJWT;