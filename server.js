// Utilizei o express para criar e configurar o Servidor
const express = require("express");
const server = express();


// Configurando arquivos estáticos
server.use(express.static("public"));

// Configuração do NunJucks
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

// Criada a rota "/"
// Capturado o pedido do cliente para resposta
server.get("/", function(req, res) {
    return res.render("index.html");
    
});

server.get("/ideias", function(req, res) {
    return res.render("ideias.html");
    
});

server.listen(3000, function() {
    console.log("Servidor Rodando!");
    
});


// console.log(__dirname + "/index.html");