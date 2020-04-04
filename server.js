// Utilizei o express para criar e configurar o Servidor
const express = require("express");
const server = express();

const db = require("./db");

// // ************************************
// const ideas = [
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
//         title: "Cursos de Programação",
//         category: "Estudo",
//         description: "Curso completo de JavaScript, ReactJS, React Native e Banco de Dados.",
//         url: "https://rocketseat.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
//         title: "Exercícios",
//         category: "Saúde",
//         description: "Atividades físicas para cuidar da saúde no período de quarentena.",
//         url: "https://saude.gov.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
//         title: "Meditação",
//         category: "Mentalidade",
//         description: "Atividades para trabalhar o psicológico para enfrentar a morosidade de não sair de casa.",
//         url: "https://rocketseat.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
//         title: "Karaokê",
//         category: "Família",
//         description: "Músicas para cantar com a família.",
//         url: "https://rocketseat.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729038.svg",
//         title: "Pintura",
//         category: "Criatividade",
//         description: "Desenhos para as crianças colorir.",
//         url: "https://rocketseat.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729048.svg",
//         title: "Recortes",
//         category: "Criatividade",
//         description: "Músicas para cantar com a família.",
//         url: "https://rocketseat.com.br"
//     },
// ]
// // ************************************


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

        // console.log(rows); 
        
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