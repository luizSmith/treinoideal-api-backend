const CPF = require('node-cpf');
class CPFValidation {

    async verificaCPF(cpf) {
        
        if (CPF.validate(cpf)) {
            return true;
        }

        throw {
            "name": "Erro de validação",
            "errors":[{
                "message": "CPF invalido"
            }]
        };
    }
}

module.exports = new CPFValidation();