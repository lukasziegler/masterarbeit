var express = require('express');
var app = express();

var question = require('./models/questions.js');

app.get('/', function (req, res) {
  res.send('Hello World!')
})

// accept POST request on the homepage
app.post('/', function (req, res) {
  res.send('Got a POST request');
})

// accept PUT request at /user
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
})

// accept DELETE request at /user
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
})



// launch server
var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Server listening on port :%s', port)
})
