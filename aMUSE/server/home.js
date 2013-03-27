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
		if(error) console.log(error);
		exhibitions = result;
	})
	connection.query(sql.query_select_sections, function(error, result) {
		if(error) console.log(error);
		sections = result;
	});
	connection.query(sql.query_select_authors, function(error, result) {
		if(error) console.log(error);
		authors = result;
	});

	var objects_query = sql.query_select_objects;
	var filter = [];
	if(req.params.selection) {
		console.log(req.params.selection);
		filter = req.params.selection.split('-');
		switch(filter[0]) {
			case 'exhibition':
			objects_query = sql.query_select_object_by_exhibition;
			break;
			case 'author':
			objects_query = sql.query_select_object_by_author;
			break;
			case 'section':
			objects_query = sql.query_select_object_by_section;
			break;
			case 'search':
			objects_query = sql.query_search;
			break;
		}
		if(filter[0] == 'search') filter = ['%' + filter[1] + '%', '%' + filter[1] + '%', '%' + filter[1] + '%', '%' + filter[1] + '%', '%' + filter[1] + '%', '%' + filter[1] + '%'];
		else filter = [filter[1]];
	}

	connection.query(objects_query, filter, function(error, result) {
		if(error) console.log(error);
		items = result;
	});
	connection.end(function() {
		if(exhibitions && authors && sections) {
			var items1 = [];
			for(var i = 0; i < items.length; i+=4) {
				items1.push(Array.prototype.slice.call(items, i, i+4));
			}
			res.render('home.html', {
				exhibitions: exhibitions,
				sections: sections,
				authors: authors,
				items: items1
			});
		} else {
			res.send(200, '<h1>An error occurred</h1>');
		}
	});
};