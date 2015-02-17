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

// Routing of static files
app.use('/app', express.static(__dirname + '/client/app'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/lib', express.static(__dirname + '/client/lib'));
app.use('/jquery-approach', express.static(__dirname + '/client/jquery-approach'));
app.all('/*', function(req, res, next) {
	// Allow Angular to support HTML5 mode
    res.sendFile('/client/index.html', { root: __dirname });
});

// Bootstrap Error Handling
require('./server/error-handling');

/** Launch server **/
var port = process.env.PORT || 8080;
var server = app.listen(port, function () {
    console.log('Client listening on port', port);
});