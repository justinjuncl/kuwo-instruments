var express = require('express')
	session = require('express-session'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

var config = require('./config');

module.exports = function (app) {

	app.use(express.static(__dirname + '/../public'));

	app.set('views', __dirname + '/../app/views');
	app.set('view engine', 'ejs');

	app.use(bodyParser.json({ limit: '10mb' }));
	app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

	app.use(session({
		secret: 'KWEB',
		cookie: { maxAge: 1000 * 60 * 60 },
		resave: true,
		saveUninitialized: true
	}));

};