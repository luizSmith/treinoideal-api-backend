const CPF = require('node-cpf');
class CPFValidation {

    async verificaCPF(cpf) {
        
        if (CPF.validate(cpf)) {
            return true;
        }

        throw 'CPF invalido';
    }
}

module.exports = new CPFValidation();