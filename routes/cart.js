// ********** Requires **********
const express = require('express');
const path = require('path')
let authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router();

// ********** Require de Controladores **********
const cartController = require('../controllers/cartController');

/*** CARRITO DE COMPRA ***/
router.get('/', authMiddleware, cartController.getCart);

/*** AGREGAR PRODUCTO AL CARRITO ***/
router.post('/agregar', authMiddleware, cartController.addToCart);

/*** BORRAR PRODUCTO DEL CARRITO ***/
router.post('/borrar', authMiddleware, cartController.removeFromCart);

/*** COMPRAR PRODUCTOS ***/
router.post('/comprar', authMiddleware, cartController.shop);

module.exports = router;