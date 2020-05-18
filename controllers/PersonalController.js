class PersonalController {
    index(req, res) {
        res.send("olá");
    }
}

module.exports = new PersonalController();