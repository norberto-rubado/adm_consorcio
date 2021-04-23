/* const fs = require('fs'); */
/* const path = require('path'); */
const moment = require('moment');
const {
	Console
} = require('console');
const {
	validationResult
} = require('express-validator');
const db = require('../database/models');
const {
	Op
} = require("sequelize");

const controller = {

	// Detalle de producto
	productDetail: (req, res) => {

		let product = db.products.findByPk(req.params.id, {
			include: [{
				association: "categories"
			}]
		})

		let product_images = db.product_image.findAll({
			where: {
				product_id: req.params.id
			}
		});

		let product_comments = db.comments.findAll({
			where: {
				product_id: req.params.id
			},
			include: [{
				association: 'users'
			}]
		});

		Promise.all([product, product_images, product_comments])
			.then(function ([product, product_images, product_comments]) {

				let cantidad_comentarios = 0
				let suma_calificacion = 0

				for (let i = 0; i < product_comments.length; i++) {

					cantidad_comentarios += 1
					suma_calificacion = suma_calificacion + product_comments[i].calification
				}

				let promedio_calificacion = suma_calificacion / cantidad_comentarios

				if (isNaN(promedio_calificacion)) {
					promedio_calificacion = ""
				}

				res.render("products/productDetail", {
					product: product,
					product_images: product_images,
					product_comments: product_comments,
					cantidad_comentarios: cantidad_comentarios,
					promedio_calificacion: promedio_calificacion
				});

			})
			.catch(error => {
				res.render('error', {
					error: error
				});
			})

	},

	// Listado de todos los productos
	productList: async (req, res) => {

		let category_products = []

		category_products = await db.categories.findAll({
			include: [{
				association: 'products',
				where: {
					status: 'Habilitado'
				},
				include: ['product_image']
			}]
		})

		res.render("products/productList", {
			category_products: category_products
		})
	},

	// Listado de productos por categoría
	productsPerCategory: async (req, res) => {

		let category_products = []

		category_products = await db.categories.findAll({
			where: {
				id: req.params.id
			},
			include: [{
				association: 'products',
				include: ['product_image']
			}]
		})

		res.render("products/productList", {
			category_products: category_products
		})
	},

	// Detalle con busqueda de producto
	productSearch: (req, res) => {

		db.products.findAll({
				where: {
					name: {
						[Op.substring]: req.query.keywords
					}
				},
				include: [{
					association: 'categories'
				}, {
					association: 'product_image'
				}]
			})
			.then(products => {
				res.render('products/productSearch', {
					products: products
				})
			})
			.catch(error => {
				res.render('error', {
					error: error
				});
			})

	},

	// Listado de productos con busqueda para edicion
	productAdminGet: async (req, res) => {

		let category_products = []

		category_products = await db.categories.findAll({
			include: [{
				association: 'products',
				include: ['product_image']
			}]
		})

		res.render("products/productAdmin", {
			category_products: category_products
		})

	},

	// Formulario de creacion
	create: (req, res) => {

		let producto_actualizado = undefined

		let categories = db.categories.findAll()

		let suppliers = db.suppliers.findAll({
			where: {
				status: 'Habilitado'
			}
		})

		Promise.all([categories, suppliers])
			.then(function ([categories, suppliers]) {
				res.render("products/productCreateForm", {
					producto_actualizado: producto_actualizado,
					categories: categories,
					suppliers: suppliers,
					product: {},
					errors: {}
				});
			})
			.catch(error => {
				res.render('error', {
					error: error
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

					let producto_actualizado = undefined

					let categories = db.categories.findAll()

					let suppliers = db.suppliers.findAll({
						where: {
							status: 'Habilitado'
						}
					})

					Promise.all([categories, suppliers])
						.then(function ([categories, suppliers]) {
							res.render("products/productCreateForm", {
								producto_actualizado: producto_actualizado,
								categories: categories,
								suppliers: suppliers,
								product: {},
								errors: {},
								store_success: '¡Tu producto fue dado de alta exitosamente!'
							});
						})
						.catch(error => {
							res.render('error', {
								error: error
							});
						})
				}).catch(error => {
					res.render('error', {
						error: error
					});
				})
		} else {
			let categories = db.categories.findAll()

			let suppliers = db.suppliers.findAll({
				where: {
					status: 'Habilitado'
				}
			})

			Promise.all([categories, suppliers])
				.then(function ([categories, suppliers]) {
					return res.render('products/productCreateForm', {
						categories: categories,
						suppliers: suppliers,
						product: req.body,
						errors: errors.mapped()
					})
				})
				.catch(error => {
					res.render('error', {
						error: error
					});
				})

		}

	},

	// Formulario de modificacion
	edit: (req, res) => {

		let product = db.products.findByPk(req.params.id)

		let product_images = db.product_image.findAll({
			where: {
				product_id: req.params.id
			}
		});

		let suppliers = db.suppliers.findAll({
			where: {
				status: "habilitado"
			}
		})

		let categories = db.categories.findAll()

		Promise.all([product, suppliers, categories, product_images])
			.then(function ([product, suppliers, categories, product_images]) {
				res.render("products/productEditForm", {
					product: product,
					categories: categories,
					suppliers: suppliers,
					product_images: product_images,
					errors: {}
				})
			})
			.catch(error => {
				res.render('error', {
					error: error
				});
			})
	},

	// Modificacion de producto
	update: (req, res, next) => {

		let errors = validationResult(req);

		if (errors.isEmpty()) {

			db.products.update({
					name: req.body.name,
					description: req.body.description,
					category_id: req.body.category_id,
					supplier_id: req.body.supplier_id,
					expiration_days: req.body.expiration_days,
					share: req.body.share,
					price: req.body.price,
					discount: req.body.discount,
					life_date_from: req.body.life_date_from,
					life_date_to: req.body.life_date_to,
					stock: req.body.stock,
					status: req.body.status
				}, {
					where: {
						id: req.params.id
					}
				})

				.then(product => {
					if (req.files.length > 0) {

						db.product_image.destroy({
								where: {
									product_id: req.params.id
								}
							})
							.then(product_image => {
								for (let i = 0; i < req.files.length; i++) {
									db.product_image.create({
										product_id: req.params.id,
										image: req.files[i].filename,
										number: i
									})
									.then(product_image => {
										res.redirect('/productos/' + req.params.id + '/detalle')
									})
									.catch(error => {
										res.render('error', {
											error: error
										})
									})
								}
							})
							.then(product => {
								res.redirect('/productos/' + req.params.id + '/detalle')
							})
							.catch(error => {
								res.render('error', {
									error: error
								})
							})

					}
					res.redirect('/productos/' + req.params.id + '/detalle');
				})
				.catch(error => {
					res.render('error', {
						error: error
					})
				})

		} else {

			let product = {
				id: req.params.id,
				...req.body
			}

			let product_images = db.product_image.findAll({
				where: {
					product_id: req.params.id
				}
			});

			let categories = db.categories.findAll()

			let suppliers = db.suppliers.findAll({
				where: {
					status: 'Habilitado'
				}
			})

			Promise.all([product, categories, suppliers, product_images])
				.then(function ([product, categories, suppliers, product_images]) {
					res.render("products/productEditForm", {
						product: product,
						categories: categories,
						suppliers: suppliers,
						product_images: product_images,
						errors: errors.mapped()
					})
				})
				.catch(error => {
					res.render('error', {
						error: error
					});
				})

		}
	},

	delete: (req, res) => {

			
		// Soft delete: Solamente movemos el status a deshabilitado pero sigue vivo en la BD
		db.products.update({
				status: "Inhabilitado",
			}, {
				where: {
					id: req.params.id
				}
			})
			
			.then((respuesta) =>{
				
				db.categories.findAll({
					include: [{
						association: 'products',
						include: ['product_image']
					}]
						}).then((category_products) =>
							res.render("products/productAdmin", { category_products: category_products, update_success: '¡Tu producto fue deshabilitado exitosamente!' }))
							
						.catch(error => {
						res.render('error', {
							error: error
						})})
					
			.catch(error => {
				res.render('error', {
					error: error
				})
			})

		/* Hard delete: Este borra el producto de la BD
		db.products.destroy({
			where: {
				id: req.params.id
			}
		})
		.then(() => res.render("products/productListForm", { products_category: products_category, category: category, update_success: '¡Tu producto fue borrado exitosamente!' }))
		.catch(error => {
			res.render('error', { error: error })
		}) */
	})}
};

module.exports = controller;