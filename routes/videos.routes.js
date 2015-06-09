'use strict';

var express     = require('express');
var videosController = require('../controllers/videos.controller');
var authController = require('../controllers/auth.controller');

module.exports = function() {
  var rutas = express.Router();

  rutas.get('/videos' , authController.autenticacion, videosController.getAll);
  rutas.get('/videos/aprobados/:inicio/:cantidad' , videosController.getAllAprobados);
  rutas.get('/videos/aprobados/count' , videosController.count);
  rutas.get('/videos/:id' , videosController.byId);
  rutas.put('/videos/:id', authController.autenticacion, videosController.update);
  rutas.post('/videos', videosController.crear);
  rutas.delete('/videos/:id', authController.autenticacion, videosController.eliminar);

  return rutas;

};
