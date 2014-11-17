var express = require('express');

var app = express();			// neues Express Objekt

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.get('/', function(req, res){
	res.render("root.jade");
});

app.listen("1337");