var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');
var logger = require('morgan');
//var config = require('config');
var bodyParser = require('body-parser');
var path = require('path');

//globals
app = express();

"use strict";

// Database connection
require('./app/db');

// Configure app to use bodyParser() - for POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure View Engine
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

// Configure Logging
app.use(express.static(path.join(__dirname, 'public')));
if (app.get('env') !== 'production') {
    app.use(logger('dev'));
}

app.on('error', function(e) {
	console.log('Fehler abgefangen.');
});

// Bootstrap routes
require('./app/routes');

// Bootstrap Error Handling
// require('./app/error-handling');


/** Launch server **/
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log('Node-Server listening on port', port);
});
