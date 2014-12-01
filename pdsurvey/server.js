var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');
var logger = require('morgan');
//var config = require('config');
var path = require('path');
var app = express();

// Routes
var controllers = require('./app/controllers')
var questions = require('./app/models/question');

// Database connection
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


// Make our db accessible to our router
// TODO -  NEEDED?
app.use(function(req,res,next){
    req.db = db;
    next();
});


// Configure Port + View Engine
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

// Configure Logging
app.use(express.static(path.join(__dirname, 'public')));
if (app.get('env') !== 'production') {
    app.use(logger('dev'));
}

// Bootstrap routes
require('./app/routes')(app);

// Bootstrap Error Handling
require('./app/error-handling')(app);

// sample GET request
// TODO: Obsolete - can be removed
app.get('/ping', controllers.index);
/* app.get('/ping', function(req, res) {
    res.render('index', { title: 'Pong', software: 'Express' });
});*/



/** Launch server **/
var server = app.listen(app.get('port'), function () {
  console.log('Server listening on port '+ app.get('port'));
});
