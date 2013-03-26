var mysql = require('mysql');


exports.app = function(req, res) {
	var connection = mysql.createConnection({
		host: 'amuse.db.8861958.hostedresource.com',
		user: 'amuse',
		password: 'ABCdef123!',
		database: 'amuse'
	});
	connection.connect();
	var filters;
	if(req.params.selection) {
		filters = req.params.selection.split('-');
                console.log(filters);
	} else {
		connection.query('SELECT * FROM Object LIMIT 24', function(error, results) {
			res.render('index0.html', {
				items: results
			});
		});
	}
	connection.end();
};