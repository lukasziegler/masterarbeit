var mongoose = require('mongoose');

// var dbURI = 'mongodb://localhost/pdsurvey';
var dbURI = 'mongodb://ds051720.mongolab.com:51720/pdsurvey';

var options = {
  db: { native_parser: true },
  user: process.env.DB_USER || '',
  pass: process.env.DB_PWD || ''
}

mongoose.connect(dbURI, options);
var db = mongoose.connection;

// CONNECTION EVENTS
// When successfully connected
db.on('connected', function () {
  console.log('Mongoose connected to', dbURI);
});

// If the connection throws an error
db.on('error',function (err) {
  console.log('Mongoose default connection error:', err);
});

// When the connection is disconnected
db.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
