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
// TODO: mongoose.connect('mongodb://username:password@localhost/test');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

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

// Bootstrap routes
require('./app/routes');

// Bootstrap Error Handling
// require('./app/error-handling');


/** Launch server **/
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log('Server listening on port', port);
});
