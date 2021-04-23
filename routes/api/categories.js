const express = require('express');
const router = express.Router();

const categoriesApiController = require('../../controllers/api/categoriesController');

router.get('/', categoriesApiController.getCategories);

module.exports = router;