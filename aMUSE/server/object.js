var sql = require('./sql.js');
var mysql = require('mysql');

module.exports = function(req, res) {
	var connection = mysql.createConnection({
		host: 'amuse.db.8861958.hostedresource.com',
		user: 'amuse',
		password: 'ABCdef123!',
		database: 'amuse'
	});
	connection.connect();
	var object = connection.query(sql.query_select_object, [req.params.id], function(error, results) {
		if(error) {
			console.log(error);
			res.render('404.html');
		} else {
			res.render('object.html', {
				item: results[0]
			});
		}
	});
	connection.end();
};