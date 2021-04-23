function localsMiddleware(req, res, next) {
    if(typeof req.session.user != 'undefined') {
        res.locals.user = req.session.user;
    }
    return next();
}

module.exports = localsMiddleware;