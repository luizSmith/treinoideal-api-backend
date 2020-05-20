const Database = require("../models/index");

class AparelhoService {
    constructor() {
        this.Aparelho = Database["Aparelho"];
    }

    async lista() {
        let result = await this.Aparelho.findAll();
        return result;
    }

    async detalhes (id) {
        let result = await this.Aparelho.findByPk(id);
        return result;
    }
}

module.exports = new AparelhoService();