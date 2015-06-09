var Sequelize = require('sequelize');
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
var config = require('../config');
var sequelize = new Sequelize(config.BBDD, config.usuarioBD, config.passwordBD, {host: config.hostBD, port: config.portBD});

var Admins = sequelize.import("../models/admins");

exports.getAll = function (req, res) {
    Admins.findAll().then(function (admins) {
      res.json(admins);
    }).error(function(err){
      console.log('Error occured' + err);
      res.status(400).send({message: 'Algo va mal.'});
    });
}

exports.byId = function (req, res) {
    Admins.findById(req.params.id).then(function (admin) {
      if(admin == null){
        res.status(404).send({message: 'El admin no existe o no lo encuentro .'});
      }else{
        res.json(admin);
      }
    }).error(function(err){
      console.log('Error occured' + err);
      res.status(400).send({message: 'Algo va mal :('});
    });
}

exports.update = function (req, res) {
    Admins.findById(req.params.id).then(function (admin) {
      if(admin == null){
        res.status(404).send({message: 'El admin no existe o no lo encuentro :...('});
      }else{
        admin.updateAttributes({nombre:req.body.nombre,
                         password:req.body.password,
                         email:req.body.email}).then(function (admin){
          res.status(200).send({message: 'El admin se actualizo con exito'});
        });
      }
    }).error(function(err){
      console.log('Error occured' + err);
      res.status(400).send({message: 'Algo va mal'});
    });
}

exports.crear = function (req, res) {
    Admins.create({nombre:req.body.nombre,
                     email:req.body.email,
                     password:passwordHash.generate(req.body.password)}).then(function (admin) {
        res.status(201).send({message: 'Admin creado con exito.'});
    }).error(function(err){
      console.log('Error occured' + err);
      res.status(400).send({message: 'Algo va mal :('});
    });
}

exports.eliminar = function (req, res) {
    Admins.destroy({where: {
      id: req.params.id
    }}).then(function (affectedRows) {
      if(affectedRows > 0){
        res.status(200).send({message: 'Admin ha  eliminado con exito.'});
      }else{
        res.status(404).send({message: 'Error al elimnar el usuario.'});
      }

    }).error(function(err){
      console.log('Error occured' + err);
      res.status(400).send({message: 'Algo va mal :('});
    });
}

exports.login = function(req, res) {

  Admins.findOne({
    where: {email: req.body.email }
  }).then(function(admin) {

    if (!admin) {
      res.json({ success: false, message: 'autenticacion fallida.' });
    } else if (admin) {

      if (!passwordHash.verify(req.body.password, admin.password)) {
        res.json({ success: false, message: 'autenticacion fallida.' });
      } else {

        var token = jwt.sign(admin, config.secret, {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        res.status(200).json({
          token: token
        });
      }

    }

  });
}
