var mysql = require('mysql');
var sqls = require('./sql.js');

// GET REQUIRED BOUNDS FOR LOG IN
module.exports = function (req,res) {
	var email = "";
	var pass = "";
	
	var connection = mysql.createConnection({
		host: 'amuse.db.8861958.hostedresource.com',
		user: 'amuse',
		password: 'ABCdef123!',
		database: 'amuse'
	});

	connection.createConnection(sqls.query_login,[email, pass], function(err, results) {
		if(err || results.length == 0)	{
			res.send('false');
		} else {
			res.send('true');
		}
	});
};