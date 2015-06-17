var Sequelize = require('sequelize');
var config = require('../config');
var sequelize = new Sequelize(config.BBDD, config.usuarioBD, config.passwordBD, {host: config.hostBD, port: config.portBD});
var Videos = sequelize.import("../models/videos");

exports.getAll = function (req, res) {
    Videos.findAll().then(function (videos) {
      res.json(videos);
    }).error(function(err){
      console.log('Error occured' + err);
      res.status(400).send({message: 'Algo va mal :(', err: err});
    });
}

exports.count = function (req, res) {
    Videos.count({where: {aprobado: 1}}).then(function (videos) {
      res.json(videos);
    }).error(function(err){
      console.log('Error occured' + err);
      res.status(400).send({message: 'Algo va mal :(', err: err});
    });
}


exports.getAllAprobados = function (req, res) {
  console.log(req.params.inicio);
  console.log(req.params.cantidad);
    Videos.findAll({where: {aprobado: 1}, offset: req.params.inicio, limit: req.params.cantidad}).then(function (videos) {
                  res.json(videos);
    }).error(function(err){
      console.log('Error occured' + err);
      res.status(400).send({message: 'Algo va mal :(', err: err});
    });
}

exports.getAllNoAprobados = function (req, res) {
  console.log(req.params.inicio);
  console.log(req.params.cantidad);
    Videos.findAll({where: {aprobado: 0}, offset: req.params.inicio, limit: req.params.cantidad}).then(function (videos) {
                  res.json(videos);
    }).error(function(err){
      console.log('Error occured' + err);
      res.status(400).send({message: 'Algo va mal :(', err: err});
    });
}


exports.byId = function (req, res) {
    Videos.findById(req.params.id).then(function (video) {
      if(video == null){
        res.status(404).send({message: 'El video no existe o no lo encuentro :...('});
      }else{
        res.json(video);
      }
    }).error(function(err){
      console.log('Error occured' + err);
      res.status(400).send({message: 'Algo va mal :('});
    });
}

exports.update = function (req, res) {
    Videos.findById(req.params.id).then(function (video) {
      if(video == null){
        res.status(404).send({message: 'El video no existe o no lo encuentro :...('});
      }else{
        video.updateAttributes({titulo:req.body.titulo,
                        url_video:req.body.url_video,
                        url_imagen:req.body.url_imagen,
                        descripcion:req.body.descripcion,
                        autor:req.body.autor,
                        aprobado:req.body.aprobado}).then(function (video){
          res.status(200).send({message: 'El video se actualizo con exito'});
        });
      }
    }).error(function(err){
      console.log('Error occured' + err);
      res.status(400).send({message: 'Algo va mal'});
    });
}

exports.aprobar = function (req, res) {
    Videos.findById(req.params.id).then(function (video) {
      if(video == null){
        res.status(404).send({message: 'El video no existe o no lo encuentro :...('});
      }else{
        video.updateAttributes({aprobado:1}).then(function (video){
          res.status(200).send({message: 'El video se actualizo con exito'});
        });
      }
    }).error(function(err){
      console.log('Error occured' + err);
      res.status(400).send({message: 'Algo va mal'});
    });
}

exports.crear = function (req, res) {
  var videosIn = JSON.parse(req.body.videos) ;

  sequelize.transaction(function (t1) {

      var queries = [];
      for (var key in videosIn) {
        queries.push(Videos.create({titulo:videosIn[key].titulo,
                            url_video:videosIn[key].url_video,
                            url_imagen:videosIn[key].url_imagen,
                            descripcion:videosIn[key].descripcion,
                            autor:videosIn[key].autor}, { transaction: t1 }));
      }
      console.log('dentro');
      return Promise.all(queries);

  }).then(function (result) {
    console.log("result");
      res.status(200).send({message: 'Videos guardados'});
  }).catch(function (err) {
    console.log(err);
      res.status(400).send({message: 'Error al guardar los videos'});
  });

}

exports.eliminar = function (req, res) {
    Videos.destroy({where: {
      id: req.params.id
    }}).then(function (affectedRows) {
      if(affectedRows > 0){
        res.status(200).send({message: 'Video ha  eliminado con exito.'});
      }else{
        res.status(404).send({message: 'Error al elimnar el video.'});
      }

    }).error(function(err){
      console.log('Error occured' + err);
      res.status(400).send({message: 'Algo va mal :('});
    });
}
