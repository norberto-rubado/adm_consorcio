const db = require('../database/models');

let rememberMiddleware = function (req, res, next) {
    if (req.cookies.recordar && !req.session.user) {
        db.users.findOne({
            where: {
                email: req.cookies.recordar
            }
        })
            .then(usuario => {
                req.session.user = usuario.email;
                return next();
            })
            .catch(error => {
                res.render('/', { errors: error });
            })
    } else {
        next();
    }
}

module.exports = rememberMiddleware;