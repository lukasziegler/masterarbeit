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
passport = require('passport');

//globals
app = express();

// Setup Authentication
var initPassport = require('./server/passport/init');
initPassport(passport);


// Database connection
require('./server/db');


// Configure all environments
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
if (app.get('env') == 'development') app.use(logger('dev'));
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());	// allow POST requests
app.use(methodOverride());
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'securedsession' }));
app.use(passport.initialize()); // Add passport initialization
app.use(passport.session());    // Add passport initialization

// Allow CORS requests
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT");
    next();
});

// Routing
router = express.Router();
require('./server/routes');
app.use('/api', router); // register routes

// Routing of static files
app.use('/app', express.static(__dirname + '/client/app'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/lib', express.static(__dirname + '/client/lib'));
app.use('/jquery-approach', express.static(__dirname + '/client/jquery-approach'));

// app.use('/admin/app', express.static(__dirname + '/backend/public/app'));
// app.use('/admin/css', express.static(__dirname + '/backend/public/css'));
// app.use('/admin/lib', express.static(__dirname + '/backend/public/lib'));
app.use('/admin', express.static(__dirname + '/backend/public'));
app.use('/tracking', express.static(__dirname + '/backend/public/tracking'));

// HTML5 mode support for Angular
app.all('/*', function(req, res, next) {
	// exclude the API (probably a dirty workaround)
	if (req.url.substring(0,4) == '/api') return next();
	// Allow Angular to support HTML5 mode

  if (req.url.substring(0,4) == '/admin')
    res.sendFile('/backend/public/index.html', { root: __dirname });
  else
    res.sendFile('/client/index.html', { root: __dirname });
});


// Bootstrap Error Handling
require('./server/error-handling');


/** Launch server **/
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
    console.log('Node-Server listening on port', port);
});