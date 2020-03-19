const express = require("express");
const app = express();

app.get("/",function(req,resp){
     resp.send("Hello World!");
});

app.listen(8080,function(erro){
    if (erro) {
        console.log("aconteceu um erro !!!");
    } else {
        console.log("servidor rodando com sucesso");
    }
    console.log("servidor rodando com sucesso 2");
});