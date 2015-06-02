var express = require('express');
var app = express();
var usuariosRoutes = require('./routes/usuarios.routes');
var adminsRoutes = require('./routes/admins.routes');
var mapasRoutes = require('./routes/mapas.routes');
var videosRoutes = require('./routes/videos.routes');
var bodyParser  = require('body-parser');
//pizza avion pizza avion
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', adminsRoutes(), usuariosRoutes(), mapasRoutes(), videosRoutes());


var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + server_port )
});
