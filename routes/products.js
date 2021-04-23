// ********** Requires **********
const express = require('express');
const multer = require('multer');
const path = require('path');
const validation = require('../middlewares/productMiddleware')
let authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/products')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname))
    }
})

/* var upload = multer({ storage: storage }) */

var upload = multer({
    storage,

    // Validate image
    fileFilter: (req, file, cb) => {
    const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

    const ext = path.extname(file.originalname);
    
    if (!acceptedExtensions.includes(ext)) {
        req.file = file;
    }
    cb(null, acceptedExtensions.includes(ext));
    }
});

// ********** Require de Controladores **********
const productsController = require('../controllers/productsController');
const { ValidationHalt } = require('express-validator/src/base');

/*** LISTADO DE PRODUCTOS (USUARIO Y ADMIN) ***/
router.get('/', authMiddleware, productsController.productList);

/*** PANEL DE ADMINISTRACIÓN (ADMIN) ***/
router.get('/administrar', authMiddleware, productsController.productAdminGet);

/*** PRODUCTOS POR CATEGORIA ***/
router.get('/:id?/listar', authMiddleware, productsController.productsPerCategory);

/*** BUSQUEDA DE PRODUCTOS ***/
router.get('/busqueda', authMiddleware, productsController.productSearch);

/*** DETALLE DE PRODUCTO ***/
router.get('/:id/detalle', authMiddleware, productsController.productDetail);

/*** CREAR UN PRODUCTO ***/
router.get('/crear', authMiddleware, productsController.create);
router.post('/crear', authMiddleware, upload.any(), validation, productsController.store);

/*** EDICIÓN DE PRODUCTOS ***/
router.get('/:id/editar', authMiddleware, productsController.edit);
router.put('/:id/editar', authMiddleware, upload.any(), validation, productsController.update);

/*** BORRADO DE PRODUCTOS ***/
router.delete('/:id/borrar', authMiddleware, productsController.delete);

module.exports = router;