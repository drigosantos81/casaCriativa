// Utilizei o express para criar e configurar o Servidor
const express = require("express");
const server = express();

const db = require("./db");

// Configurando arquivos estáticos
server.use(express.static("public"));

server.use(express.urlencoded({ extended: true }));

// Configuração do NunJucks
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

// Criação das rotas "/"
// Capturado o pedido do cliente para resposta

// INDEX
server.get("/", function(req, res) {
    
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        
        if (err) {
            console.log(err);
            return res.send("Erro no Banco de Dados");            
        }

        const reversedIdeas = [...rows].reverse();

        let lastIdeas = []
        for (let idea of reversedIdeas) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea);
            }
        }
        
        return res.render("index.html", { ideas: lastIdeas });   

                       
    });
 
});

// IDEIAS
server.get("/ideias", function(req, res) {

    db.all(`SELECT * FROM ideas`, function(err, rows) {

        if (err) {
            console.log(err);
            return res.send("Erro no Banco de Dados");            
        }

        const reversedIdeas = [...rows].reverse();

        return res.render("ideias.html", { ideas: reversedIdeas });
    })

});

server.post("/", function(req, res) {
       //Inserir dados na tabela
        const query = `
            INSERT INTO ideas(
                image,
                title,
                category,
                description,
                link
            ) VALUES (?,?,?,?,?);
            `
        const values = [
                req.body.image,
                req.body.title,
                req.body.category,
                req.body.description,
                req.body.link,
            ]

        db.run(query, values, function(err) {
            if (err) {
                console.log(err);
                return res.send("Erro no Banco de Dados");            
            }

            return res.redirect("/ideias")
            
        });
});

server.listen(3000, function() {
    console.log("Servidor Rodando!");
    
});

// console.log(__dirname + "/index.html");