const Database = require("../models/index");

class AparelhoService {
    constructor() {
        this.Aparelho = Database["tb_aparelho"];
    }

    async lista() {
        let result = await this.Aparelho.findAll();
        return result;
    }

    async detalhes (id) {
        let result = await this.Aparelho.findByPk(id);
        if (result == undefined) {
            throw "Bad Request"
        }
        return result;
    }
}

module.exports = new AparelhoService();