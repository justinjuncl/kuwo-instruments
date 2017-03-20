var express = require('express'),
	mongoose = require('mongoose'),
	config = require('./config/config');

var app = express();

require('./app/models/post');

require('./config/express')(app);
require('./config/routes')(app);

function connect () {
	return mongoose.connect(config.db).connection;
}

connect()
	.on('error', console.log)
	.on('disconnected', connect)
	.once('open', function () {
		app.listen( process.env.PORT || config.port, function () {
			console.log('Node app is running on port', config.port);
		});
	});

