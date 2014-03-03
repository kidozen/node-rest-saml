var request = require('request');

module.exports = function(options, cb) {
 	
 	var req = {
 		uri: options.endpoint,
 		method: "POST",
 		form: {
        	wrap_name: options.user,
			wrap_password: options.pass,
			wrap_scope: options.scope
    	}
    }

	request(req, function(err, response) {
		if (err || response.statusCode != 200) {
			cb(err);
			return;
		};

		var token = parseRstr(response.body);
		cb(null, token);
	});
}

 function parseRstr(rstr) {
	var tokenParsed = /<Assertion(.*)<\/Assertion>/.exec(rstr);

	if (!tokenParsed || tokenParsed.length == 0) {
		return;
	};

	return tokenParsed[0];
}