var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');
var config = require('config');

var app = express();

// Bootstrap models
fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});


// Bootstrap routes
require('./config/routes')(app);


// launch server
var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Server listening on port :%s', port)
})
