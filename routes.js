const express = require('express');
const router = express.Router();

const controller = require('./controller');
const auth = require('./auth');

router.get("/products", controller.getAllProducts);

router.get("/products/:id", controller.getProductByID);

router.post("/products", controller.createProduct);

router.put("/products/:id", controller.updateProductByID);

router.delete("/products/:id", controller.deleteProductByID);

router.post("/login", auth.login);

router.get("/users", auth.getAllUsers)

router.post("/users", auth.createUser);

router.put("/users/:username", auth.updateUser);

router.delete("/users/:username", auth.deleteUser);

module.exports = router;