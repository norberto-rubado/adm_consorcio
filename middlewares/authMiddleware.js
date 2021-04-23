const fs = require('fs');
const path = require('path')

// const usersFilePath = path.join(__dirname, '../data/users.json');
// var users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

function authMiddleware(req, res, next) {

    var arrayUrl = req.originalUrl.split("/");
    res.locals.message = "Error de Acceso";
    res.locals.path = req.originalUrl;

    if (req.session.user != undefined) {
        if (req.session.user.rol == "") {
            req.session.user.rol = "user"
        }
        switch (arrayUrl[1]) {
            case 'usuarios':
                if (arrayUrl[2] == "registro") {
                    res.locals.error = { stack: "Esta pagina es solo para invitados" }
                    return res.render('error');
                }
            case 'productos':

                if ((arrayUrl[2] == "crear") & req.session.user.rol != "admin") {
                    return res.redirect("/usuarios/login")
                }

                if ((arrayUrl[3] == "editar" ||
                    arrayUrl[3] == "borrar" ||  
                    arrayUrl[2] == "listado") & req.session.user.rol != "admin") {
                    res.locals.error = { stack: "Para acceder a esta pagina el usuario debe ser Administrador" }
                    return res.render('error')
                }
        }
        next();
    } else {
        switch (arrayUrl[1]) {
            case 'carrito':
                res.locals.error = { stack: "Para acceder a esta pagina debe estar logueado" }
                return res.render('error')
            case 'productos':

                if (arrayUrl[2] == "crear" ||
                    arrayUrl[3] == "detalle") {
                    return res.redirect("/usuarios/login")
                }

                if (arrayUrl[3] == "editar" ||
                    arrayUrl[3] == "borrar" ||  
                    arrayUrl[2] == "listado") {
                    res.locals.error = { stack: "Para acceder a esta pagina debe estar logueado" }
                    return res.render('error')
                }
        }
        next();
    }
}

module.exports = authMiddleware;