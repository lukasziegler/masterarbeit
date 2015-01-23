var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {

  // Define the strategy to be used by PassportJS
  passport.use(new LocalStrategy(
    function(username, password, done) {
      if (username === "admin" && password === "admin") // stupid example
        return done(null, {name: "admin"});

      return done(null, false, { message: 'Incorrect username.' });
    }
  ));

  // Serialized and deserialized methods when got from session
  passport.serializeUser(function(user, done) {
      done(null, user);
  });

  passport.deserializeUser(function(user, done) {
      done(null, user);
  });

  // // Define a middleware function to be used for every secured route
  // var auth = function(req, res, next){
  //   if (!req.isAuthenticated()) 
  //   	res.status(401).end();
  //   else
  //   	next();
  // };

}