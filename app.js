const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");

//Router
const PersonalRouter = require("./routes/PersonalRouter");
const AparelhoRouter = require("./routes/AparelhoRouter");
const UfRouter = require("./routes/UfRouter");
const ExercicioRouter = require("./routes/ExercicioRouter");
const CepRouter = require("./routes/CepRouter");

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Routes
app.use("/",PersonalRouter);
app.use("/",AparelhoRouter);
app.use("/",UfRouter);
app.use("/",ExercicioRouter);
app.use("/",CepRouter);

// Router
app.get("/",function(req,res){
     console.log("Aplicação rodando com sucesso");
     res.send("Hello World!");
});

app.use(function (req, resp, next) {
    resp.status(404).render("notFound");
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.listen(process.env.PORT || 3000,function(erro){
    if (erro) {
        console.log("aconteceu um erro !!!");
    } else {
        console.log("servidor rodando com sucesso");
    }
    console.log("servidor rodando com sucesso 2");
});