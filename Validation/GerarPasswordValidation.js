const generator = require('generate-password');

class GerarPassword {

    async gerar() {
        let password = generator.generate({
            length: 10,
            numbers: true,
            excludeSimilarCharacters: true,
            symbols: true
        });

        return password;
    }
}

module.exports = new GerarPassword();