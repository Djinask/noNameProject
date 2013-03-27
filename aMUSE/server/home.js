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
	var exhibitions, authors, sections, items;
	connection.query(sql.query_select_exhibitions, function(error, result) {
		exhibitions = result;
	})
	connection.query(sql.query_select_sections, function(error, result) {
		sections = result;
	});
	connection.query(sql.query_select_authors, function(error, result) {
		authors = result;
	});
	connection.query(sql.query_select_objects, function(error, result) {
		items = result;
	});
	connection.end(function() {
		if(exhibitions && authors && sections && items) {
			var items1 = [];
			for(var i = 0; i < items.length; i+=4) {
				items1.push(Array.prototype.slice.call(items, i, 4));
			}
			res.render('home.html', {
				exhibitions: exhibitions,
				sections: sections,
				authors: authors,
				items: items1
			});
		}
	});
};