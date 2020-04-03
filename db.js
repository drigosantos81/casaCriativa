const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./ws.db');

db.serialize(function() {

    // Criar Tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `);

    //Inserir dados na tabela
    // const query = `
    // INSERT INTO ideas(
    //     image,
    //     title,
    //     category,
    //     description,
    //     link
    // ) VALUES (?,?,?,?,?);
    // `
    // const values = [
    //     "https://image.flaticon.com/icons/svg/2729/2729007.svg",
    //     "Cursos de Programação",
    //     "Estudo",
    //     "Curso completo de JavaScript, ReactJS, React Native e Banco de Dados.",
    //     "https://rocketseat.com.br"
    // ]

    // db.run(query, values, function(err) {
    //     if (err) return console.log(err);

    //     console.log(this);
        
    // });

    // Deletar dados na tabela
    // db.run(`DELETE FROM ideas WHERE id = ?`, [1], function(err) {
    //     if (err) return console.log(err);

    //     console.log("Registro apagado", this);
    // });

    // Consultar os dados na tabela
    // db.all(`SELECT * FROM ideas`, function(err, rows) {
    //     if (err) return console.log(err);

    //     console.log(rows);                
    // });

});

module.exports = db;