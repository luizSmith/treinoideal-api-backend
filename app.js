const express = require("express");
const app = express();

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