// ********** Requires **********
const express = require('express');
let authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router();

// ********** Require de Controladores **********
const indexController = require('../controllers/indexController')

/*** HOME PAGE ***/
router.get('/',authMiddleware, indexController.home);

/*** NOSOTROS ***/
router.get('/nosotros',authMiddleware, indexController.nosotros);

/*** CONTACTO ***/
router.get('/contacto',authMiddleware, indexController.contacto);

/*** COMO REGALAR ***/
router.get('/comoregalar',authMiddleware, indexController.comoregalar);


/*** PREGUNTAS FRECUENTES ***/
router.get('/preguntasFrecuentes',authMiddleware, indexController.preguntasFrecuentes);

/*** TEST ***/
router.get('/test',authMiddleware, indexController.getTest);

/*** GENERACION SQL PARA INSERT EN MYSQL ***/
router.get('/generarsql', indexController.generarsql);

module.exports = router;
