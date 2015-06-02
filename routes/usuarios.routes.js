'use strict';

var express     = require('express');
var usuariosController = require('../controllers/usuarios.controller');
var authController = require('../controllers/auth.controller');

module.exports = function() {
  var rutas = express.Router();

  rutas.get('/usuarios', authController.autenticacion, usuariosController.getAll);
  rutas.get('/usuarios/count', authController.autenticacion, usuariosController.count);
  rutas.get('/usuarios/:id', authController.autenticacion, usuariosController.byId);
  rutas.put('/usuarios/:id', authController.autenticacion, usuariosController.update);
  rutas.post('/usuarios', authController.autenticacion, usuariosController.crear);
  rutas.delete('/usuarios/:id', authController.autenticacion, usuariosController.eliminar);

  return rutas;

};
