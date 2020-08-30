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
const AlunoRouter = require("./routes/AlunoRouter");
const HorarioRouter = require("./routes/HorarioRouter");
const PersonalAlunoRouter = require("./routes/PersonalAlunoRouter");
const SerieRouter = require("./routes/SerieRouter");
const AulaRouter = require("./routes/AulaRouter");

const RaizRouter = require("./routes/RaizRouter");
//Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./models/swagger.json');

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//Swagger
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Routes
app.use("/",PersonalRouter);
app.use("/",AparelhoRouter);
app.use("/",UfRouter);
app.use("/",ExercicioRouter);
app.use("/",CepRouter);
app.use("/",AlunoRouter);
app.use("/",HorarioRouter);
app.use("/",PersonalAlunoRouter);
app.use("/",AulaRouter);
app.use("/",SerieRouter);
app.use("/",RaizRouter);


// Router
app.get("/",function(req,res){
     console.log("Aplicação rodando com sucesso");
     res.send("Hello, World!");
});

app.use(function (req, resp, next) {
    resp.status(404).render("notFound");
});

app.listen(process.env.PORT || 3000,function(erro){
    if (erro) {
        console.log("aconteceu um erro !!!");
    } else {
        console.log("servidor rodando com sucesso");
    }
    console.log("servidor rodando com sucesso 2");
});