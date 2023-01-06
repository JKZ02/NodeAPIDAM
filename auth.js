const pool = require("./db")

const login = (req, res) => {
    let body = req.body;
    
    pool.query(`SELECT * FROM users WHERE username='${body.username}';`).then(results => {
        console.log(results.rows)
        if (results.rowCount == 0) {
            res.status(200).json("Conta invalida");
        } else {
            if (body.password == results.rows[0].password) {
                res.status(200).json(results.rows[0].role);
            } else {
                res.status(200).json("Conta invalida");
            }
            
        }
    }).catch(error => {
        res.status(500).json({result: "Ocorreu um erro ao tentar obter o utilizador"});
        console.log(error);
    });
}

const register = (req, res) => {
    let body = req.body;

    if (body) {
        pool.query(`INSERT INTO "users"("username", "password", "role") 
                    VALUES('${body.username}', '${body.password}', '${body.role}');`).then(results => {
            res.status(200).json("User criado");
            //console.log("Produto Adicionado");
        }).catch(error => {
            res.status(500).json("Ocorreu um erro ao tentar criar o produto");
            console.log(error);
        });
    } else {
        res.status(400).json("Não existem dados para fazer a criação de um novo user");
    }
}


module.exports = {
    login,
    register,
}
