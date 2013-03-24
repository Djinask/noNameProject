var express = require('express'); 
var app = express();

var func  = function(req,res) {
	var email = req.params.email;
	var mysql = require('mysql');

	var connection = mysql.createConnection({
		host: 'amuse.db.8861958.hostedresource.com',
		user: 'amuse',
		password: 'ABCdef123!',
	});

	connection.connect();

	var passGen = (function() {
		var txt = "";
		var possible = "abcdefghilmnopqrstuvzxyjkw_-.1234567890!?ABCDEFGHILMNOPQRSTUVZXYJKW";
		var passLen = Math.floor((Math.random()*9)+6);		
		for(var i=0; i<passLen; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}	
	})();

	connection.query("INSERT INTO User(email,password) VALUES (" + email + "," + password + ")");

	connection.end();
};

app.get('/signup/:email', func);

app.listen(3033);
