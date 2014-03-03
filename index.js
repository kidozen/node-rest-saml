var express = require('express');
var http = require('http');
var saml20 = require('saml20');
var path = require('path');

var app = express();

app.use(function (req, res, next) {
	var authHeader = req.headers.authorization;

	if (!authHeader || authHeader.indexOf('Bearer') == -1) {
		res.send(403, { message: "Please send me a token!" });
		return
	};

	var token = (new Buffer(authHeader.slice('Bearer '.length, authHeader.length - 1), 'base64')).toString();

	if (!token) {
		res.send(403, { message: "Please send me a token!" });
		return		
	};

	var options = { 
		thumbprint: '1aeabdfa4473ecc7efc5947b19436c575574baf8',
		audience: 'https://kido-tests.accesscontrol.windows.net/'
	};

	saml20.validate(token, options, function(err, claims) {
		if (err) {
			res.send(403, { message: "Invalid Token", err: err.message });
			return
		};

		req.user = claims;
		next();
	})
})

app.get('/', function (req, res, next) {
	console.log(req.user);
	res.json({ message: 'Hello!' });
})

http.createServer(app).listen(8000, function(){
  console.log("Express server listening on port 8000");
});