var Sequelize = require('sequelize');
var config = require('../config');
var sequelize = new Sequelize(config.BBDD, config.usuarioBD, config.passwordBD, {host: config.hostBD, port: config.portBD});

var Usuarios = sequelize.import("../models/usuarios");

exports.getAll = function (req, res) {
    Usuarios.findAll().then(function (usuarios) {
      for(var key in usuarios){
        var d = usuarios[key].nacimiento;
        var d1 = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
        usuarios[key].nacimiento = d1;
      }
      res.json(usuarios);
    }).error(function(err){
      console.log('Error occured' + err);
      res.status(400).send({message: 'Algo va mal :('});
    });
}


exports.count = function (req, res) {
  Usuarios.count().then(function (usuarios) {
      res.json(usuarios);
    }).error(function(err){
      console.log('Error occured' + err);
      res.status(400).send({message: 'Algo va mal :(', err: err});
    });
}

exports.byId = function (req, res) {
    Usuarios.findById(req.params.id).then(function (usuario) {
      if(usuario == null){
        res.status(404).send({message: 'El usuario no existe o no lo encuentro :...('});
      }else{
        console.log(usuario);
        res.json(usuario);
      }
    }).error(function(err){
      console.log('Error occured' + err);
      res.status(400).send({message: 'Algo va mal :('});
    });
}

exports.update = function (req, res) {
    Usuarios.findById(req.params.id).then(function (usuario) {
      if(usuario == null){
        res.status(404).send({message: 'El usuario no existe o no lo encuentro :...('});
      }else{
        var nac = req.body.nacimiento.split('/');
        var fecha = nac[2]+'/'+nac[1]+'/'+nac[0];
        usuario.updateAttributes({nombre:req.body.nombre,
                         email:req.body.email,
                         nacimiento:fecha}).then(function (usuario){
          res.status(200).send({message: 'El usuario se actualizo con exito'});
        });
      }
    }).error(function(err){
      console.log('Error occured' + err);
      res.status(400).send({message: 'Algo va mal'});
    });
}

exports.crear = function (req, res) {
    var nac = req.body.nacimiento.split('/');
    var fecha = nac[2]+'/'+nac[1]+'/'+nac[0];
    Usuarios.create({nombre:req.body.nombre,
                     email:req.body.email,
                     nacimiento:fecha}).then(function (usuario) {
        res.status(201).send({message: 'Usuario creado con exito.'});
    }).error(function(err){
      console.log('Error occured' + err);
      res.status(400).send({message: 'Algo va mal :('});
    });
}

exports.eliminar = function (req, res) {
    Usuarios.destroy({where: {
      id: req.params.id
    }}).then(function (affectedRows) {
      if(affectedRows > 0){
        res.status(200).send({message: 'Usuario ha  eliminado con exito.'});
      }else{
        res.status(404).send({message: 'Error al elimnar el usuario.'});
      }

    }).error(function(err){
      console.log('Error occured' + err);
      res.status(400).send({message: 'Algo va mal :('});
    });
}
