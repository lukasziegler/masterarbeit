



// error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);

    // extension for development error handler
    if (app.get('env') === 'development') {
    	console.error(err);
    	res.send(err.message);
    } else {
    	res.send();
    }
});



// TODO
// think about logging my errors depending on the 
// development environment
// > production -> save it to file or separate DB 
// > development -> console log!


//// Catch 404 and forwarding to error handler
// if (app.get('env') === 'development') {
//  app.use(function(req, res, next) {
//      var err = new Error('Not Found');
//      err.status = 404;
//      next(err);
//  });
// }