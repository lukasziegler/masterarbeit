fakultaet = function(n){
	var result = 1;
	console.log('Berechnung gestartet');
	for(var i = 1; i <= n; i++){
		result = result * i;
	}
	console.log('Berechnung zu Ende');
	return result;
}

var http = require('http');
http.createServer(function(req, res){
	console.log('Hier ist ein Request rein gekommen');
	res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
	var fakultaet10 = fakultaet(10);
	res.end('Die Fakultät von 10 ist: ' + fakultaet10);
	console.log('Hier ist ein Request zu ende');
}).listen(1337);

console.log('Hier ist alles zu Ende');
