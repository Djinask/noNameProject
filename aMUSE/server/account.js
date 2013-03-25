var express = require('express'); 
var app = express();
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'amuse.db.8861958.hostedresource.com',
	user: 'amuse',
	password: 'ABCdef123!',
	database: 'amuse'
});

var generatePassword = function() {
	var text = "";
	var possible = "abcdefghilmnopqrstuvzxyjkw_-.1234567890!?ABCDEFGHILMNOPQRSTUVZXYJKW";
	var passLen = Math.floor(Math.random()*4)+6;		
	for(var i=0; i<passLen; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;	
};

var signUp  = function(req, res) {
	var email = req.params.email;
	var password = generatePassword();
	connection.connect();
	connection.query("INSERT INTO User(email,password) VALUES (?, ?)", [email, password], function(error) {
		if(error) {
			console.log(error);
			res.send(200, 'An error occurred');
		} else {
			res.send(200, 'Query executed, your email is: ' + email + 'and your password is: ' + password);
		}
	});
	connection.end();
};

app.get('/signup/:email', signUp);

app.listen(3033);
