'use strict';

var express     = require('express');
var adminsController = require('../controllers/admins.controller');
var authController = require('../controllers/auth.controller');

module.exports = function() {
  var rutas = express.Router();

  rutas.post('/admins/login' , adminsController.login);
  rutas.get('/admins' , authController.autenticacion, adminsController.getAll);
  rutas.get('/admins/:id' , authController.autenticacion, adminsController.byId);
  rutas.put('/admins/:id' , authController.autenticacion, adminsController.update);
  rutas.post('/admins' , authController.autenticacion, adminsController.crear);
  rutas.delete('/admins/:id' , authController.autenticacion, adminsController.eliminar);

  return rutas;

};
