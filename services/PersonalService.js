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

        if (result == undefined) {
            throw "Bad Request";
        }

        return result;
    }

    async lista() {
        let result = await this.Personal.findAll();
        return result;
    }

    async detalhes (id) {
        let result = await this.Personal.findByPk(id);
        return result;
    }

    async atualiza(id,dados) {
        let result = await this.Personal.update(dados,{
            where: {
                cd_personal: id
            }
        });
        return result;
    }

    async deleta(id) {
        let result = await this.Personal.destroy({
            where: {
                cd_personal: id
            }
        });
        return result;
    }
}

module.exports = new PersonalService();