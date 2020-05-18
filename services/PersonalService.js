const Database = require("../models/index");

class PersonalService {
    constructor() {
        this.Personal = Database["tb_personal"];
    }
}

module.exports = new PersonalService();