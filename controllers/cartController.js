const {
    validationResult
} = require('express-validator');
const db = require('../database/models');
const moment = require('moment');

const controller = {

    getCart: (req, res) => {

        db.items.findAll({
                include: [{
                    association: 'products',
                    where: {
                        status: 'Habilitado'
                    },
                    include: [{
                        association: 'product_image'
                    }]
                }],
                where: {
                    user_id: req.session.user.id,
                    state: 1,
                }
            })
            .then(items => {
                res.render('cart/productCart', {
                    items: items
                });
            })
            .catch(err => {
                res.render(err.message)
            })
    },

    addToCart: (req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            db.items.findOne({
                where: {
                    user_id: req.session.user.id,
                    product_id: req.body.product_id,
                    state: 1
                }
            }).then(response => {
                if (response != undefined) {
                    let order_quantity = response.quantity;
                    db.items.destroy({
                        where: {
                            user_id: req.session.user.id,
                            product_id: req.body.product_id
                        }
                    }).then(response => {
                        db.products.findByPk(req.body.product_id)
                            .then((product) => {
                                // Saco el valor del producto, teniendo en cuenta el descuento.
                                let price =
                                    Number(product.discount) > 0 ?
                                    Math.ceil(product.price - (product.price * product.discount) / 100) :
                                    product.price;

                                // Creo el Item de compra
                                return db.items.create({
                                    sale_price: price,
                                    quantity: parseInt(req.body.quantity) + parseInt(order_quantity),
                                    subtotal: price * (parseInt(req.body.quantity) + parseInt(order_quantity)),
                                    state: 1,
                                    user_id: req.session.user.id,
                                    seller_id: product.supplier_id,
                                    product_id: product.id,
                                    created_at: moment(new Date()).format('YYYY-MM-DD')
                                });
                            })
                            .then((item) => res.redirect('/carrito'))
                            .catch((err) => console.log(err.message));
                    })
                } else {
                    db.products.findByPk(req.body.product_id)
                        .then((product) => {
                            // Saco el valor del producto, teniendo en cuenta el descuento.
                            let price =
                                Number(product.discount) > 0 ?
                                Math.ceil(product.price - (product.price * product.discount) / 100) :
                                product.price;

                            // Creo el Item de compra
                            return db.items.create({
                                sale_price: price,
                                quantity: req.body.quantity,
                                subtotal: price * req.body.quantity,
                                state: 1,
                                user_id: req.session.user.id,
                                seller_id: product.supplier_id,
                                product_id: product.id,
                                created_at: moment(new Date()).format('YYYY-MM-DD')
                            });
                        })
                        .then((item) => res.redirect('/carrito'))
                        .catch((err) => console.log(err.message));
                }
            }).catch(err => res.render('error', {
                error: err
            }));
        } else {
            db.products.findByPk(req.body.product_id)
                .then(product => {
                    return res.render('/productos/' + req.body.product_id + '/detalle', { // <<<<<<<<<<<<<<<<<<<<<<<<<<< NO CREO QUE ESTO FUNCIONE
                        product,
                        errors: errors.mapped()
                    })
                })
        }
    },

    removeFromCart: (req, res) => {
        db.items.destroy({
                where: {
                    id: req.body.item_id,
                },
                force: true,
            })
            .then((response) => res.redirect('/carrito'))
            .catch((e) => console.log(e));
    },

    shop: (req, res) => {
        let items;

        // busco los items agregados al carrito
        db.items.findAll({
                where: {
                    user_id: req.session.user.id,
                    state: 1,
                },
            })
            // cierro los items
            .then((itemsSearched) => {
                items = itemsSearched;
                return db.items.closeItems(req.session.user.id);
            })
            // busco el ultimo carrito creado
            .then(() => {
                return db.carts.findOne({
                    order: [
                        ["created_at", "DESC"]
                    ],
                });
            })
            // creo el nuevo carrito
            .then((cart) => {
                return db.carts.create({
                    order_number: cart ? ++cart.order_number : 1000,
                    total: items.reduce(
                        (total, item) => (total = total + item.subtotal),
                        0
                    ),
                    user_id: req.session.user.id,
                });
            })
            // les asigno el id del carrito nuevo a los items no asignados
            .then((cart) => {
                return db.items.assignItems(req.session.user.id, cart.id);
            })
            // redirect
            .then(() => res.redirect('/usuarios/historial'))
            .catch((e) => console.log(e.message));
    }
};

module.exports = controller;