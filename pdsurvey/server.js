var newrelic = require('newrelic');
var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');
var logger = require('morgan');
//var config = require('config');
var bodyParser = require('body-parser');
var path = require('path');

//globals
app = express();


// Database connection
require('./server/db');

// Configure app to use bodyParser() - for POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Configure View Engine
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

if (app.get('env') !== 'production') {
    app.use(logger('dev'));
}

// Allowing CORS requests
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT");
    next();
});


// Configure Logging
app.use(express.static(__dirname + '/backend/public'));


// Register our routes
router = express.Router();
require('./server/routes');
app.use('/api', router); // registering

// Bootstrap Error Handling
require('./server/error-handling');


/** Launch server **/
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
    console.log('Node-Server listening on port', port);
});