var express = require('express');
var app = express();
var usuariosRoutes = require('./routes/usuarios.routes');
var adminsRoutes = require('./routes/admins.routes');
var mapasRoutes = require('./routes/mapas.routes');
var videosRoutes = require('./routes/videos.routes');
var bodyParser  = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, GET, POST, PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
  next();
});

app.use('/api', adminsRoutes(), usuariosRoutes(), mapasRoutes(), videosRoutes());


var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '192.168.4.121';

app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + server_port )
});
