var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');
var logger = require('morgan');
var config = require('config');
var path = require('path');

var app = express();
var controllers = require('./app/controllers')


// Database connection
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});


// testing Mongoose
// var mongooseTesting = require('./mongoose');
// mongooseTesting(app);



// Configure
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));


/** Load all outsourced files **/

// Dynamically include Models (NOT controllers)
fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});

// Bootstrap routes
require('./app/routes')(app);

// sample GET request
app.get('/ping', controllers.index)


/// Catch 404 and forwarding to error handler
if (app.get('env') === 'development') {
	app.use(function(req, res, next) {
	    var err = new Error('Not Found');
	    err.status = 404;
	    next(err);
	});
}

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


/** Launch server **/
var server = app.listen(app.get('port'), function () {
  console.log('Server listening on port '+ app.get('port'));
});
