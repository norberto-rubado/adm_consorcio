// ********** Requires **********
const express = require('express');
const multer = require('multer');
const path = require('path');
const validation = require('../../middlewares/productMiddleware')
let authMiddleware = require('../../middlewares/authMiddleware')

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
const productsAPIController = require('../../controllers/api/productsController');

/*** Devuelve listado de productos ***/
router.get('/',productsAPIController.getProducts);

/*** Devuelve el último producto creado ***/
router.get('/ultimo',productsAPIController.getLatestProduct);

/*** Devuelve detalle de un producto ***/
router.get('/:id',productsAPIController.getProductDetails);

/*** CREAR UN PRODUCTO ***/
router.post('/crear', authMiddleware, upload.any(), validation, productsAPIController.store);

module.exports = router;