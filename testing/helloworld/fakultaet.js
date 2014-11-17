fakultaet = function(n, callback){
	process.nextTick(function(){
		var result = 1;
		console.log('Berechnung gestartet');
		for(var i = 1; i <= n; i++){
			result = result * i;
		}
	})
}