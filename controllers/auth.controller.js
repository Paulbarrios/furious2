var jwt = require('jsonwebtoken');
var config = require('../config');

exports.autenticacion = function(req, res, next) {

  var token = req.body.token || req.query.token || req.headers['token'];
  if (token) {

    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.json({message: 'Error de autenticacion.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });

  } else {

    return res.status(403).send({
        message: 'No esta logueado, use el token.'
    });

  }
}
