const express = require('express');
const router = express.Router();

const usersApiController = require('../../controllers/api/usersController');

router.get('/', usersApiController.getUsers);
router.get('/check', usersApiController.validateEmail);
router.get('/:id', usersApiController.getUserDetails);

module.exports = router;