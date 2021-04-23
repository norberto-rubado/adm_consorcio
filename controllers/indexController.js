const fs = require('fs');
const path = require('path');
const { DH_CHECK_P_NOT_PRIME } = require('constants');
const db = require('../database/models');

const categoriesSQLFilePath = path.join(__dirname, '../data/categories.sql');
const productsSQLFilePath = path.join(__dirname, '../data/products.sql');
const product_imageSQLFilePath = path.join(__dirname, '../data/product_image.sql');
const commentsSQLFilePath = path.join(__dirname, '../data/comments.sql');
const suppliersSQLFilePath = path.join(__dirname, '../data/suppliers.sql');
const usersSQLFilePath = path.join(__dirname, '../data/users.sql');
const questions_answersSQLFilePath = path.join(__dirname, '../data/questions_answers.sql');


const controller = {

  // Home Page

  home: (req, res) => {

		let products = []
		let categories = []

    products = db.products.findAll(
      {
      where: { status: "Habilitado" },
      include: [{ association: "product_image" }]
      }
    )

    categories = db.categories.findAll()

		Promise.all([products,categories])
			.then(function ([products, categories]) {
        res.render('index', {categories:categories, products:products});
			})
			.catch(error => {
				res.render('error', { error: error });
			})

  },

  // Nosotros

  nosotros: (req, res) => {

  db.categories.findAll()
  .then ((categories) => {
        res.render('index/nosotros', {categories: categories});
			})
			.catch(error => {
				res.render('error', { error: error });
			})

  },

  // Contacto

  contacto: (req, res) => {
    res.render('index/contacto');
  },

  comoregalar: (req, res) => {

		let products = []
		let categories = []

    products = db.products.findAll(
      {
      where: { status: "Habilitado" },
      include: [{ association: "product_image" }]
      }
    )

    categories = db.categories.findAll()

		Promise.all([products,categories])
			.then(function ([products, categories]) {
        res.render('index/comoregalar', {categories:categories, products:products});
			})
			.catch(error => {
				res.render('error', { error: error });
			})

  },

// Preguntas frecuentes

  preguntasFrecuentes: (req, res) => {

    db.questions_answers.findAll()
    .then ((questions_answers) => {
          res.render('index/preguntasFrecuentes',{questions_answers: questions_answers});
        })
        .catch(error => {
          res.render('error', { error: error });
        })
  
    },

  // Test

  getTest: (req, res) => {
    res.render('test');
  },

  // Generar sql que insert a Mysql

  generarsql: (req, res) => {

    // categories

    try {
      fs.unlinkSync(categoriesSQLFilePath)
    } catch(err) {

    }

    for (let i=0; i<categories.length; i++) {
      let sql = "insert into categories values ('" + 
      categories[i].id + "','" +
      categories[i].description + "','" +  
      categories[i].description + "');" + "\n"
      fs.appendFileSync(categoriesSQLFilePath, sql);
    }

    // products

    try {
      fs.unlinkSync(productsSQLFilePath)
    } catch(err) {

    }

    for (let i=0; i<products.length; i++) {
      let sql = "insert into products values ('" + 
      products[i].id + "','" +
      products[i].name + "','" +
      products[i].description + "','" +
      products[i].category + "','" +
      products[i].supplier + "','" +
      products[i].creation_date + "','" +
      products[i].expiration_days + "','" +
      products[i].share + "','" +
      products[i].price + "','" +
      products[i].discount + "','" +
      products[i].life_date_from + "','" +
      products[i].life_date_to + "','" +
      products[i].stock + "','" +
      products[i].status + "','admin@dh.com');" + "\n"
      fs.appendFileSync(productsSQLFilePath, sql);
    }

    // product_image

    try {
      fs.unlinkSync(product_imageSQLFilePath)
    } catch(err) {

    }

    let id = 0 
    for (let i=0; i<products.length; i++) {
      id += 1
      let sql = "insert into product_image values ('" + 
      id + "','" +
      products[i].id + "','" +
      products[i].main_image + 
      "','0');" + "\n"
      fs.appendFileSync(product_imageSQLFilePath, sql);
    }
    

      // comments

      try {
        fs.unlinkSync(commentsSQLFilePath)
      } catch(err) {
  
      }
  
      id = 0 
      for (let i=0; i<comments.length; i++) {
        id += 1
        let sql = "insert into comments values ('" + 
        id + "','" +
        comments[i].user_id + "','" +
        comments[i].product_id + "','" +
        comments[i].comment + "','" +
        comments[i].comment_date + "','" +
        comments[i].calification + "');" + "\n"
        fs.appendFileSync(commentsSQLFilePath, sql);
      }

      // suppliers

      try {
        fs.unlinkSync(suppliersSQLFilePath)
      } catch(err) {
  
      }
  
      for (let i=0; i<suppliers.length; i++) {
        let sql = "insert into suppliers values ('" + 
        suppliers[i].id + "','" +
        suppliers[i].description + "','" +
        suppliers[i].description + "','" +
        suppliers[i].status + "');" + "\n"
        fs.appendFileSync(suppliersSQLFilePath, sql);
      }

      // users

      try {
        fs.unlinkSync(usersSQLFilePath)
      } catch(err) {
  
      }
  
      for (let i=0; i<users.length; i++) {
        let sql = "insert into users values ('" + 
        users[i].id + "','" +
        users[i].first_name + "','" +
        users[i].last_name + "','" +
        users[i].email + "','" +
        users[i].password + "','" +
        users[i].rol + "','" +
        "','" +
        users[i].last_login + "','" +
        users[i].last_date_password + "','" +
        users[i].language + "','" +
        users[i].country + "','" +
        users[i].bday + "','" +
        users[i].residence + "','" +
        users[i].phone + "','" +
        users[i].dark_mode + "','" +
        users[i].status + "');" + "\n"
        fs.appendFileSync(usersSQLFilePath, sql);
      }

      // questions_answers

    try {
      fs.unlinkSync(questions_answersSQLFilePath)
    } catch(err) {

    }

    for (let i=0; i<preguntasFrecuentes.length; i++) {
      let sql = "insert into questions_answers values ('" + 
      preguntasFrecuentes[i].id + "','" +
      preguntasFrecuentes[i].pregunta + "','" +  
      preguntasFrecuentes[i].respuesta + "');" + "\n"
      fs.appendFileSync(questions_answersSQLFilePath, sql);
    }

  }

}

module.exports = controller;