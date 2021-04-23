const { validationResult } = require('express-validator');
const createError = require('http-errors');
const db = require('../../database/models');
const { forEach } = require('../../middlewares/productMiddleware');


module.exports = {
	getCategories (req, res,next){

		console.log("paso x categorias")
		db.categories.findAll({
			include: [{ association: 'products', where: { status: 'Habilitado'} }]
		})
		
			.then(function(categories){
				
				let newCategories = categories.map((category) => {
					return {
						id: category.id,
						name: category.name,
						description: category.description,
						count : category.products.length,
						detail: '/api/categorias/' + category.id
					}
				})

                let respuesta = {
					meta:{
						count: categories.length,
						url: "/api/categories"
						},
					data: newCategories}
			res.send(respuesta)})
			.catch(e => console.log(e));

    },

   
    
};