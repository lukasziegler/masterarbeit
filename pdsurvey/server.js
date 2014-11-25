var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');
var config = require('config');

var app = express();
var controllers = require('./app/controllers')

// configure
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');
//app.use(express.static(path.join(__dirname, 'public')));



/** Load all outsourced files **/

// Bootstrap models
fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});

// Bootstrap routes
require('./app/routes')(app);

// sample GET request
app.get('/ping', controllers.index)



/** Launch server **/
var server = app.listen(app.get('port'), function () {
  var port = server.address().port
  console.log('Server listening on port :%s', port)
})
