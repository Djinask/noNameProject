var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'amuse.db.8861958.hostedresource.com',
	user: 'amuse',
	password: 'ABCdef123!',
	database: 'amuse'
});
connection.connect();

exports.app = function(req, res) {
	var filters;
	if(req.params.length > 0) {
		filters = req.params.filter.split('-');
	} else {
		connection.query('SELECT * FROM Object LIMIT 25', function(error, results) {
			res.render('index0.html', {
				items: results
			});
		});
	}
	
};