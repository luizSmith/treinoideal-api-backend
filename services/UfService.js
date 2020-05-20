const Database = require("../models/index");

class UfService {
    constructor() {
        this.Uf = Database["UF"];
    }

    async lista() {
        let result = await this.Uf.findAll();
        return result;
    }

    async detalhes (id) {
        let result = await this.Uf.findByPk(id);
        if (result == undefined) {
            throw "Bad Request"
        }
        return result;
    }
}

module.exports = new UfService();