const Database = require("../models/index");

class HorarioService {
    constructor() {
        this.Horario = Database["tb_horario"];
        this.Personal = Database['tb_personal'];
        this.Aluno = Database['tb_aluno'];
        this.Associacao = Database['tb_personal_aluno'];
        this.sequelize = Database.sequelize;
        this.QueryTypes = Database.sequelize.QueryTypes;
    }

    async insert(horario) {
        let {
            associacao,
            hora_inicial,
            hora_final,
            dia_semana,
            disponivel
        } = horario;

        let hora = {
            cd_personal_aluno:associacao,
            hr_inicial:hora_inicial,
            hr_final:hora_final,
            dd_semana:dia_semana,
            ic_disponivel:disponivel
        };

        let result = await this.Horario.create(hora);
        result = {
            codigo:result.cd_horario,
            associacao:result.cd_personal_aluno,
            inicio:result.hr_inicial,
            final:result.hr_final,
            dia_semana:result.dd_semana
        };
        return result;
        
    }
    
    async lista(id) {
        let result = await this.sequelize.query(`
            SELECT
                h.cd_horario codigo_horario,
                DATE_FORMAT(h.hr_inicial,"%T") hora_inicio,
                DATE_FORMAT(h.hr_final,"%T") hora_final,
                h.dd_semana dia_semana,   
                a.cd_personal_aluno codigo_associacao,
                al.cd_aluno codigo_aluno,
                al.nm_aluno nome_aluno,
                al.cd_cpf cpf_aluno
            FROM
                tb_personal_aluno a
            INNER JOIN
                tb_aluno al ON a.cd_aluno = al.cd_aluno
            INNER JOIN
                tb_horario h ON h.cd_personal_aluno = a.cd_personal_aluno
            WHERE
                a.cd_personal = :personal
            ORDER BY
                dia_semana,
                hora_inicio
        `,{
            replacements: { personal: id },
            type: this.QueryTypes.SELECT,
            raw: true
        });
        
        return result;
    }

    async detalhes (id) {
        let result = await this.sequelize.query(`
            SELECT
                h.cd_horario codigo_horario,
                DATE_FORMAT(h.hr_inicial,"%T") hora_inicio,
                DATE_FORMAT(h.hr_final,"%T") hora_final,
                h.dd_semana dia_semana,
                h.ic_disponivel ativo,
                a.cd_personal_aluno codigo_associacao,
                al.cd_aluno codigo_aluno,
                al.nm_aluno nome_aluno
            FROM
                tb_personal_aluno a
            INNER JOIN
                tb_aluno al ON a.cd_aluno = al.cd_aluno
            INNER JOIN
                tb_horario h ON h.cd_personal_aluno = a.cd_personal_aluno
            WHERE
                h.cd_horario = :horario
        `,{
            replacements: { horario: id },
            type: this.QueryTypes.SELECT,
            raw: true
        });

        return result;
    }

    async atualiza(id,horario) {

        let {
            associacao,
            hora_inicial,
            hora_final,
            dia_semana,
            disponivel
        } = horario;
        
        let dados = {
            hr_inicial:hora_inicial,
            hr_final:hora_final,
            dd_semana:dia_semana,
            ic_disponivel:disponivel
        };

        let result = await this.Horario.update(dados,{
            where: {
                cd_horario: id
            }
        });

        return result;
    }

    async deleta(id,associacao) {
        let result = await this.Horario.destroy({
            where: {
                cd_horario: id,
                cd_personal_aluno:associacao
            }
        });
        return result;
    }

    async verifica_horario_insert(dados) {
        /* Verifica se o horário desejado num dia da semana especifico está ocupado
            Lembrando que deve verificar os horários do personal da associacao
        */  
        let result = await this.sequelize.query(`
            SELECT
                h.cd_horario codigo_horario,
                DATE_FORMAT(h.hr_inicial,"%T") hora_inicio,
                DATE_FORMAT(h.hr_final,"%T") hora_final,
                h.dd_semana dia_semana,
                h.ic_disponivel ativo,
                h.cd_personal_aluno codigo_associacao
            FROM
                tb_horario h
            JOIN # retorna o personal da associacao
                (SELECT ass.cd_personal codigo_personal FROM tb_personal_aluno ass WHERE ass.cd_personal_aluno = :associacao) personal_associacao
            INNER JOIN #todas as associacoes que tem horario e que sao do personal listado
                tb_personal_aluno a ON h.cd_personal_aluno = a.cd_personal_aluno AND a.cd_personal = personal_associacao.codigo_personal
            WHERE
                h.dd_semana = :dia_semana
                AND
                h.ic_disponivel = "1"
                AND
                TIME(h.hr_inicial) >= TIME(TIME_FORMAT(:hora_inicial,"%T"))
                AND 
                TIME(h.hr_final) <= TIME(TIME_FORMAT(:hora_final,"%T"))
        `,{
            replacements: dados,
            type: this.QueryTypes.SELECT,
            raw: true
        });

        if (result.length) {
            throw {
                "name": "ProcessoInsert",
                "errors":[{
                    "message": "Horário ocupado pelo personal"
                }]
            }
        }

        return result;
    }

    async verifica_horario_update(id,dados) {
        dados.id = id;

        let result = await this.sequelize.query(`
            SELECT
                h.cd_horario codigo_horario,
                DATE_FORMAT(h.hr_inicial,"%T") hora_inicio,
                DATE_FORMAT(h.hr_final,"%T") hora_final,
                h.dd_semana dia_semana,
                h.ic_disponivel ativo,
                h.cd_personal_aluno codigo_associacao
            FROM
                tb_horario h
            JOIN # retorna o personal da associacao
                (SELECT ass.cd_personal codigo_personal FROM tb_personal_aluno ass WHERE ass.cd_personal_aluno = :associacao) personal_associacao
            INNER JOIN #todas as associacoes que tem horario e que sao do personal listado
                tb_personal_aluno a ON h.cd_personal_aluno = a.cd_personal_aluno AND a.cd_personal = personal_associacao.codigo_personal
            WHERE
                h.dd_semana = :dia_semana
                AND
                h.ic_disponivel = "1"
                AND
                h.cd_horario NOT IN(:id)
                AND
                TIME(h.hr_inicial) >= TIME(TIME_FORMAT(:hora_inicial,"%T"))
                AND 
                TIME(h.hr_final) <= TIME(TIME_FORMAT(:hora_final,"%T"))
        `,{
            replacements: dados,
            type: this.QueryTypes.SELECT,
            raw: true
        });

        if (result.length) {
            throw {
                "name": "ProcessoInsert",
                "errors":[{
                    "message": "Horário ocupado pelo personal"
                }]
            }
        }

        return result;
    }

}

module.exports = new HorarioService();