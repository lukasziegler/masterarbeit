var fs = require('fs');
var express = require('express');
var path = require('path');

//globals
app = express();

// Configure View Engine
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

// Configure Logging
app.use(express.static(__dirname + '/client'));

// Allowing CORS requests
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT");
    next();
});

// Bootstrap Error Handling
require('./server/error-handling');

/** Launch server **/
var port = process.env.PORT || 8080;
var server = app.listen(port, function () {
    console.log('Client listening on port', port);
});