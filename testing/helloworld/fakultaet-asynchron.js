fakultaet = function(n, callback){
	process.nextTick(function() {
		var result = 1;
		console.log('Berechnung gestartet');
		for(var i = 1; i <= n; i++){
			result = result * i;
		}
		console.log('Berechnung zu Ende');
		callback(result);
	}, 0);
}

var http = require('http');
http.createServer(function(req, res){
	console.log('Hier ist ein Request rein gekommen');
	res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
	
	fakultaet(10, function(facultaet10){
		res.end('Die Fakultät von 10 ist: ' + facultaet10);
	});

	console.log('Hier ist ein Request zu ende');
}).listen(1337);

console.log('Hier ist alles zu Ende');