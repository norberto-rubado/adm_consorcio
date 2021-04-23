const { validationResult } = require('express-validator');
const createError = require('http-errors');
const db = require('../../database/models');
const { forEach } = require('../../middlewares/productMiddleware');
const { login } = require('../usersController');

module.exports = {
	getUsers (req, res,next){

		db.users.findAll({
			attributes:[
				"id", 
				"first_name",
				"email"
			]
		})
		
			.then(function(users){
				let newUsers = users.map((user) => {
					return {
						id: user.id,
						first_name: user.first_name,
						email: user.email,
						detail: '/api/users/' + user.id
					}
				})

				let respuesta = {
					meta:{
						count: users.length,
						url: "/api/users"
						},
					data: newUsers}
			res.send(respuesta)})
			.catch(e => console.log(e));

    },

    getUserDetails (req, res){

		db.users.findByPk(req.params.id)
            
		.then(function(user){

			// Vamos a sacar la info de la password, el last login, el last date password, la fecha de nacimiento y el telefono
			let newUsers = {

				id: user.id,
				first_name: user.first_name,
				last_name: user.last_name,
				email: user.email,
				image: "http://localhost:3001/images/users/" + user.image,
				language: user.language,
				country: user.country,
				residence: user.residence,
				dark_mode: user.dark_mode,
				status: user.status	
			}
			
			let respuesta = {
				data: newUsers}
		res.send(respuesta)})
		.catch(e => console.log(e));


		
    },

	validateEmail (req, res) {
		db.users.findOne({
			where: {
				email: req.query.email
			}
		}).then(response => {

			if(response) {
				res.json({status: '200'})
			} else {
				res.json({status: '404'})
			}

		}).catch(err => {
			res.json(err);
		})
	}
    
};