
var mongoose = require('mongoose');

module.exports = function (app) {

	// testing Mongoose
	var kittySchema = mongoose.Schema({
	    name: String
	})

	// NOTE: methods must be added to the schema before compiling it with mongoose.model()
	kittySchema.methods.speak = function () {
	  var greeting = this.name
	    ? "Meow name is " + this.name
	    : "I don't have a name"
	  console.log(greeting);
	}

	var Kitten = mongoose.model('Kitten', kittySchema)

	var silence = new Kitten({ name: 'Silence' })
	console.log(silence.name) // 'Silence'

	// call the Method added to the Schema
	var fluffy = new Kitten({ name: 'fluffy' });
	fluffy.speak() // "Meow name is fluffy"


	// Saving the objects to MongoDB
	fluffy.save(function (err, fluffy) {
	  if (err) return console.error(err);
	  fluffy.speak();
	});

	var verdufti = new Kitten({ name: 'Verdufti' })
	var mucki = new Kitten({ name: 'Mucki' })

	verdufti.save(function (err, fluffy) {
	  if (err) return console.error(err);
	  console.log("Saved "+fluffy.name+" to MongoDB")
	});

	mucki.save(function (err, fluffy) {
	  if (err) return console.error(err);
	  console.log("Saved "+fluffy.name+" to MongoDB")
	});

	// Loading all Documents from MongoDB
	Kitten.find(function (err, kittens) {
		if (err) return console.error(err);
		console.log(kittens)
	})


	// accept GET requests
	app.get('/mongoose', function (req, res) {
	  res.send('Mongoose!')
	})

}