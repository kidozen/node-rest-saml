var assert          = require('assert');
var path            = require('path');
var request 		= require('request');
var getToken		= require('./getToken.js');
var server 			= require('../index.js');

it('Should validate SAML token', function (done) {
	
	var options = {
		endpoint: '',
		user: '',
		pass: '',
		scope: ''
	}

	getToken(options, function(err, token) {
		
		assert.ifError(err);

		var reqOpts = {
			uri: 'http://localhost:8000/',
			headers: {
				Authorization: 'Bearer ' + (new Buffer(token)).toString('base64')
			}
		}

		request(reqOpts, function(err, res, body) {
			assert.ifError(err);
			assert.equal(200, res.statusCode);

			done();
		})
	})

});

