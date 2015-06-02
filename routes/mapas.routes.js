'use strict';

var express     = require('express');
var mapasController = require('../controllers/mapas.controller');
var authController = require('../controllers/auth.controller');

module.exports = function() {
  var rutas = express.Router();

  rutas.get('/mapas' , mapasController.getAll);
  rutas.get('/mapas/:id' , mapasController.byId);
  rutas.put('/mapas/:id', authController.autenticacion, mapasController.update);
  rutas.post('/mapas', authController.autenticacion, mapasController.crear);
  rutas.delete('/mapas/:id', authController.autenticacion, mapasController.eliminar);

  return rutas;

};
