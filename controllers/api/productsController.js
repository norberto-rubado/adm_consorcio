const moment = require('moment');
const {
	Console
} = require('console');
const {
	validationResult
} = require('express-validator');
const db = require('../../database/models');
const {
	Op,
	json
} = require("sequelize");

const controller = {

	/* Devuelve total de productos, total de productos por categoría y array con detalles por producto */
	getProducts: async (req, res) => {
		db.categories.findAndCountAll({ // Evaluar si vale la pena hacer la consulta en db.products en lugar de db.categories
			include: [{
				association: 'products',
				where: {
					status: 'Habilitado'
				},
				include: [{
					association: 'product_image'
				}]
			}]
		}).then(response => {

			let count = 0
			let countByCategory = {}
			let products = []
			response.rows.forEach(function (category) {
				countByCategory[category.name] = category.products.length;
				count = count + category.products.length;
				products = products.concat(category.products.map(function (product) {
					return {
						id: product.id,
						name: product.name,
						description: product.description,
						images: product.product_image.map(function (image) {
							return {
								image: "http://localhost:3001/images/products/" + image.image,
								number: image.number
							}
						}),
						category: category.name,
						price: product.price,
						discount: product.discount,
						stock: product.stock,
						detail: '/api/productos/' + product.id
					}
				}))
			})

			let productList = {
				count: count,
				countByCategory: countByCategory,
				products: products
			}
			res.json(productList)
		}).catch(err => {
			res.json({
				message: 'Hubo un error al traer la lista de productos',
				error: err
			});
		})
	},

	/* Devuelve los detalles de un producto */
	getLatestProduct: (req, res) => {
		db.products.findOne({
			order: [
				['created_at', 'DESC']
			],
			where: {
				status: 'Habilitado'
			},
			include: [{
				association: 'product_image'
			}]
		}).then(response => {
			let productDetails = JSON.parse(JSON.stringify(response));
			productDetails.image = "http://localhost:3001/images/products/" + response.product_image[0].image;
			res.json(productDetails)
		}).catch(err => {
			res.json({
				message: 'Hubo un error al consultar el último producto',
				error: err
			})
		})
	},

	/* Devuelve todos los detalles de un producto */
	getProductDetails: async (req, res) => {
		db.products.findOne({
			where: {
				id: req.params.id
			},
			include: [{
				association: 'product_image',
				as: 'imagenes'
			}]
		}).then(response => {
			let productDetails = JSON.parse(JSON.stringify(response));
			productDetails.image = "http://localhost:3001/images/products/" + response.product_image[0].image;
			res.json(productDetails)
		}).catch(err => {
			res.json({
				message: 'Hubo un error al traer los detalles de un producto particular',
				error: err
			});
		})
	},

	// Alta de producto
	store: (req, res, next) => {

		let errors = validationResult(req);

		if (errors.isEmpty()) {

			db.products.create({
					name: req.body.name,
					description: req.body.description,
					category_id: req.body.category_id,
					supplier_id: req.body.supplier_id,
					created_at: moment(new Date()).format('YYYY-MM-DD'),
					expiration_days: req.body.expiration_days,
					share: req.body.share,
					price: req.body.price,
					discount: req.body.discount,
					life_date_from: req.body.life_date_from,
					life_date_to: req.body.life_date_to,
					stock: req.body.stock,
					status: req.body.status,
					user_id: req.session.user.id
				})
				.then(product => {
					for (let i = 0; i < req.files.length; i++) {
						db.product_image.create({
							product_id: product.id,
							image: req.files[i].filename,
							number: i
						})
					}
					res.status(201).json({})
				})
				.catch(error => {
					res.json(error)
				})

		} else {
			res.status(303).json({})
		}
	}

}

module.exports = controller;