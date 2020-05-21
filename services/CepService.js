const Database = require("../models/index");
const UfService = require("./UfService");

class CepService {
    constructor() {
        this.Cep = Database["tb_cep"];
    }

    async insert(personal) {
        let {cod, longra, bairro, cidade, uf} = personal;

        try {

            await UfService.detalhes(uf);
        
            let per = {
                cd_cep:cod,
                nm_longradouro:longra,
                nm_bairro:bairro,
                nm_cidade:cidade,
                sg_uf:uf
            };

            let result = await this.Cep.create(per);
            return result;

        } catch(erro) {
            throw erro;
        }
        
    }
    /*
    async lista() {
        let result = await this.Cep.findAll();
        return result;
    }

    async detalhes (id) {
        let result = await this.Cep.findByPk(id);
        return result;
    }

    async atualiza(id,dados) {
        let result = await this.Cep.update(dados,{
            where: {
                cd_personal: id
            }
        });
        return result;
    }

    async deleta(id) {
        let result = await this.Cep.destroy({
            where: {
                cd_personal: id
            }
        });
        return result;
    }
    */
}

module.exports = new CepService();