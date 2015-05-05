var newrelic = require('newrelic');
var express = require('express');
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');
var logger = require('morgan');
//var config = require('config');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var session = require('express-session');

app = express();

// Database connection
require('./pdserver/db');

// Logging of HTTP requests
if (app.get('env') == 'development') app.use(logger('dev'));
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());	// allow POST requests
app.use(methodOverride());

// Allow CORS requests
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT");
    next();
});

// Routing
router = express.Router();
require('./pdserver/routes');
app.use('/api', router); // register routes

// Routing of static files
app.use('/app', express.static(__dirname + '/pdclient/app'));
app.use('/css', express.static(__dirname + '/pdclient/css'));
app.use('/docs', express.static(__dirname + '/docs/site'));
app.use('/lib', express.static(__dirname + '/pdclient/lib'));
app.use('/jquery-approach', express.static(__dirname + '/pdclient/jquery-approach'));
app.use('/admin', express.static(__dirname + '/pdadmin/public'));
app.use('/tracking', express.static(__dirname + '/pdadmin/public/tracking'));


// HTML5 mode support for Angular
app.all('/*', function(req, res, next) {
	// exclude the API (probably a dirty workaround)
  if (req.url.substring(0,4) == '/api') return next();
	// Allow Angular to support HTML5 mode
  if (req.url.substring(0,6) == '/admin')
    res.sendFile('/pdadmin/public/index.html', { root: __dirname });
  else
    res.sendFile('/pdclient/index.html', { root: __dirname });
});



// Bootstrap Error Handling
require('./pdserver/error-handling');

/** Launch server **/
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
    console.log('Node-Server listening on port', port);
});
