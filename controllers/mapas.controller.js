var Sequelize = require('sequelize');
var config = require('../config');
var sequelize = new Sequelize(config.BBDD, config.usuarioBD, config.passwordBD, {host: config.hostBD, port: config.portBD});

var Mapas = sequelize.import("../models/mapas");

exports.getAll = function (req, res) {
    Mapas.findAll().then(function (mapas) {
      res.json(mapas);
    }).error(function(err){
      console.log('Error occured' + err);
      res.status(400).send({message: 'Algo va mal.'});
    });
}

exports.byId = function (req, res) {
    Mapas.findById(req.params.id).then(function (mapa) {
      if(mapa == null){
        res.status(404).send({message: 'El mapa no existe o no lo encuentro .'});
      }else{
        res.json(mapa);
      }
    }).error(function(err){
      console.log('Error occured' + err);
      res.status(400).send({message: 'Algo va mal :('});
    });
}

exports.update = function (req, res) {
    Mapas.findById(req.params.id).then(function (mapa) {
      if(mapa == null){
        res.status(404).send({message: 'El mapa no existe o no lo encuentro :...('});
      }else{
        mapa.updateAttributes({punto_x:req.body.punto_x,
                         punto_y:req.body.punto_y,
                         nombre:req.body.nombre,
                         calle:req.body.calle,
                         codigo_postal:req.body.codigo_postal,
                         no_puerta:req.body.no_puerta}).then(function (mapa){
          res.status(200).send({message: 'El mapa se actualizo con exito'});
        });
      }
    }).error(function(err){
      console.log('Error occured' + err);
      res.status(400).send({message: 'Algo va mal'});
    });
}

exports.crear = function (req, res) {
    Mapas.create({punto_x:req.body.punto_x,
                     punto_y:req.body.punto_y,
                     nombre:req.body.nombre,
                     calle:req.body.calle,
                     codigo_postal:req.body.codigo_postal,
                     no_puerta:req.body.no_puerta}).then(function (mapa) {
        res.status(201).send({message: 'Mapa creado con exito.'});
    }).error(function(err){
      console.log('Error occured' + err);
      res.status(400).send({message: 'Algo va mal :('});
    });
}

exports.eliminar = function (req, res) {
    Mapas.destroy({where: {
      id: req.params.id
    }}).then(function (affectedRows) {
      if(affectedRows > 0){
        res.status(200).send({message: 'Mapa ha  eliminado con exito.'});
      }else{
        res.status(404).send({message: 'Error al elimnar el usuario.'});
      }

    }).error(function(err){
      console.log('Error occured' + err);
      res.status(400).send({message: 'Algo va mal :('});
    });
}
