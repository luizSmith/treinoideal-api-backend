const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Router
app.get("/",function(req,resp){
     console.log("Aplicação rodando com sucesso");
     resp.send("Hello World!");
});

app.listen(process.env.PORT || 3000,function(erro){
    if (erro) {
        console.log("aconteceu um erro !!!");
    } else {
        console.log("servidor rodando com sucesso");
    }
    console.log("servidor rodando com sucesso 2");
});