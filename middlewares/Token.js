const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
require("dotenv-safe").config();


async function verifyJWT(req, res, next){
    let token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).send({
            auth: false, 
            message: 'No token provided.'
        });
    }
    
    try {

        await jwt.verify(token, process.env.SECRET);
        
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