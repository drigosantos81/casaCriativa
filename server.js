// Utilizei o express para criar e configurar o Servidor
const express = require("express");
const server = express();


// Configurando arquivos estáticos
server.use(express.static("public"));

// Criada a rota "/"
// Capturado o pedido do cliente para resposta
server.get("/", function(req, res) {
    return res.sendFile(__dirname + "/index.html");
    
});

server.get("/ideias", function(req, res) {
    return res.sendFile(__dirname + "/ideias.html");
    
});

server.listen(3000, function() {
    console.log("Servidor Rodando!");
    
});


// console.log(__dirname + "/index.html");