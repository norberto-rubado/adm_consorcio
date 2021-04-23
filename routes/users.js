// ********** Requires **********
const express = require('express');
const multer = require('multer');
const path = require('path')
const { check, validationResult, body } = require("express-validator");
let guestMiddleware = require('../middlewares/guestMiddleware');
let authMiddleware = require('../middlewares/authMiddleware');
const registerMiddleware = require('../middlewares/registerMiddleware');
const loginMiddleware = require('../middlewares/loginMiddleware');
const rememberMiddleware = require('../middlewares/rememberMiddleware');

const router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/users')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + req.body.email.replace(/\s/g, "-").toLowerCase() + '.jpg')
    }
})

var storageAvatar = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/users')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + req.session.user.email.replace(/\s/g, "-").toLowerCase() + '.jpg')
    }
})

var upload = multer({ storage: storage })
var uploadAvatar = multer({ storage: storageAvatar})

// ********** Require de Controladores **********
const usersController = require('../controllers/usersController');

/*** REGISTRO ***/
router.get('/registro', authMiddleware, usersController.register);
router.post('/registro', upload.any(), registerMiddleware, usersController.createUser);

/*** LOGIN ***/
router.get('/login', authMiddleware, usersController.login);
router.post('/login', loginMiddleware, rememberMiddleware, usersController.processLogin)

/*** LOGOUT ***/
router.get('/logout', authMiddleware, usersController.logout);

/*** HISTORIAL ***/
router.get('/historial', authMiddleware, usersController.history)

/*** PERFIL ***/
router.get('/:id/perfil', authMiddleware, usersController.getProfile);
router.put('/:id/actualizar', authMiddleware, upload.any(), usersController.updateProfile)
router.put('/:id/actualizarAvatar', authMiddleware, uploadAvatar.any(), usersController.updateAvatar)

module.exports = router;