const Database = require("../models/index");

class UfService {
    constructor() {
        this.Uf = Database["tb_uf"];
    }

    async lista() {
        let result = await this.Uf.findAll();
        return result;
    }

    async detalhes (id) {
        let result = await this.Uf.findByPk(id);
        return result;
    }
}

module.exports = new UfService();