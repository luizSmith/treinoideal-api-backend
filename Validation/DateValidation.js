class DateValidation {
    async format(data,format) {

        let date = new Date(data);

        if (date == 'Invalid Date') {
            let response = {
                "name": "Erro de validação",
                "errors":[{
                    "message": "Data invalida"
                }]
            };
            throw response;
        }
        
        let formatado = await format
        .replace("YYYY",date.getUTCFullYear()) //ano
        .replace("MM",await this.forma_numeracao(date.getUTCMonth()+1)) //mes
        .replace("dd",await this.forma_numeracao(date.getUTCDate()+1)) //dia
        .replace("hh",await this.forma_numeracao(date.getHours())) //hora
        .replace("mm",await this.forma_numeracao(date.getUTCMinutes())) //minuto
        .replace("ss",await this.forma_numeracao(date.getUTCSeconds())) //segundo

        return formatado;
    }

    async forma_numeracao(val) {
        if (val < 10 && val >= 0) {
            return `0${val}`;
        }
        return val;
    }
}

module.exports = new DateValidation();