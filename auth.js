const pool = require("./db")

const getAllUsers = (req, res) => {
    pool.query('SELECT username,role FROM users;').then(results => {
        res.status(200).json(results.rows);
    }).catch(error => {
        res.status(500).json({result: "Ocorreu um erro ao tentar obter os produtos"});
        console.log(error);
    });

}


const createUser = (req, res) => {
    let body = req.body;

    if (body) {
        pool.query(`INSERT INTO "users"("username", "password", "role") 
                    VALUES('${body.username}', '${body.password}', '${body.role}');`).then(results => {
            res.status(200).json("User criado");
        }).catch(error => {
            res.status(500).json("Ocorreu um erro ao tentar criar o user");
            console.log(error);
        });
    } else {
        res.status(400).json("Não existem dados para fazer a criação de um novo user");
    }
}


const updateUser = (req, res) => {
    let body = req.body;
    let username = req.params.username
    
    if (body) {
        pool.query(`UPDATE users SET username = '${body.username}', password = '${body.password}', role = '${body.role}' WHERE username='${username}'`).then(results => {
            if (results.rowCount == 1) {
                res.status(200).json("User Atualizado");
            } else {
                res.status(200).json("O user já foi eliminado");
            }
        }).catch(error => {
            res.status(500).json("Ocorreu um erro ao tentar atualizar o user");
            console.log(error);
        });
    } else {
        res.status(400).json("Não existem dados para fazer a atualização do user");
    }
}


const deleteUser = (req, res) => {
    let username = req.params.username;

    pool.query(`DELETE FROM users WHERE username=${username};`).then(results => {
        if (results.rowCount == 1) {
            res.status(200).json("User Eliminado");
        } else {
            res.status(200).json("O user já foi eliminado");
        }
    }).catch(error => {
        res.status(500).json("Ocorreu um erro ao tentar eliminar o user");
        console.log(error);
    });
}



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


module.exports = {
    login,
    createUser,
    updateUser,
    deleteUser,
    getAllUsers
}
