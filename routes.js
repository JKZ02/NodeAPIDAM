const express = require('express');
const router = express.Router();

const controller = require('./controller');
const auth = require('./auth');

router.get("/products", controller.getAllProducts);

router.get("/users", auth.getAllUsers)

router.put("/login", auth.login);

router.put("/register", auth.register);

router.get("/products/:id", controller.getProductByID);

router.post("/products", controller.createProduct);

router.put("/products/:id", controller.updateProductByID);

router.delete("/products/:id", controller.deleteProductByID);

module.exports = router;