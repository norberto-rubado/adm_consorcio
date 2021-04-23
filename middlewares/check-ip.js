module.exports = function(req,res,next) {

    if (req.ip != "::1") {

        res.locals.message = "Error de Acceso";
        res.locals.path = req.path;
        res.locals.error = {"stack" : "El usuario no tiene permiso para acceder a la pagina"} 
      
        return res.render('error');

    }
    next ()
}