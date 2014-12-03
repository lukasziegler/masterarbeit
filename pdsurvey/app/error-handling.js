
/**
 * Debug information is only shown in development mode
 */ 

/// Catch 404 and forwarding to error handler

// if (app.get('env') === 'development') {
// 	app.use(function(req, res, next) {
// 	    var err = new Error('Not Found');
// 	    err.status = 404;
// 	    next(err);
// 	});
// }


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

// TODO
// think about logging my errors depending on the 
// development environment
// production -> save it to file or separate DB 
// development -> console log!