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
    let username = req.params.id;

    pool.query(`SELECT * FROM users WHERE username='${body.username}';`).then(results => {
        if (results.rowCount != 0) {
            res.status(200).json("Conta duplicada");
        } else {
            res.status(200).json("Conta valida");
        }
    }).catch(error => {
        res.status(500).json({result: "Ocorreu um erro ao tentar obter o utilizador"});
        console.log(error);
    });
}


module.exports = {
    login,
    register,
}
