const Database = require("../models/index");

class PersonalService {
    constructor() {
        this.Personal = Database["Personal"];
    }

    async insert(personal) {
        let {nome, email, senha, data, cref} = personal;
        let per = {
            nm_personal:nome,
            nm_email:email,
            nm_senha:senha,
            dt_nascimento:data,
            cd_cref:cref
        };

        let result = await this.Personal.create(per);
        return result;
    }
}

module.exports = new PersonalService();