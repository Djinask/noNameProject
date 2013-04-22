var sendEmail = require('./mail.js');

var generatePassword = function() {
	var text = "";
	var possible = "abcdefghilmnopqrstuvzxyjkw_-.1234567890!?ABCDEFGHILMNOPQRSTUVZXYJKW";
	var passLen = Math.floor(Math.random()*4)+6;		
	for(var i=0; i<passLen; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;	
};

module.exports  = function(req, res) {
	var email = req.params.email;
	var password = generatePassword();
	var conn = res.mysqlCreateConnection();
	conn.query(res.query.query_insert_mail, [email, password], function(error) {
		if(error) {
			console.log(error);
			res.send(200, 'error');
		} else {
			sendEmail(email, password);
			res.send(200, 'success');
		}
	});
	conn.end();
};