const Database = require("../models/index");

class ExercicioService {
    constructor() {
        this.Exercicio = Database["tb_exercicio"];
    }

    async lista() {
        let result = await this.Exercicio.findAll();
        return result;
    }

    async detalhes (id) {
        let result = await this.Exercicio.findByPk(id);
        if (result == undefined) {
            throw "Bad Request"
        }
        return result;
    }
}

module.exports = new ExercicioService();