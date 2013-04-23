var sql = require('./sql.js');

module.exports = function(req, res) {

	var connection = res.mysqlCreateConnection();
	var exhibitions, authors, sections, items, page;
	connection.query(sql.query_select_exhibitions, function(error, results) {
		if(error) console.log(error);
		exhibitions = results;
	});
	connection.query(sql.query_select_sections, function(error, results) {
		if(error) console.log(error);
		sections = results;
	});
	connection.query(sql.query_select_authors, function(error, results) {
		if(error) console.log(error);
		authors = results;
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

	var startView;
	var numOnView = 24;
	var numElements;
	if(req.params.page == 0) {
		page = 0;
	} else {
		startView = 24*(req.params.page-1);
	}

	filter.push(startView, numOnView, numElements);

	connection.query(objects_query, filter, function(error, results) {
		if(error) console.log(error);
		items = results;
	});
	connection.end(function() {
		if(exhibitions && authors && sections && page) {
			var items1 = [];
			for(var i = 0; i < items.length; i+=4) {
				items1.push(Array.prototype.slice.call(items, i, i+4));
			}
			res.render('home.html', {
				exhibitions: exhibitions,
				sections: sections,
				authors: authors,
				items: items1,
				page: page
			});
		} else {
			res.send(200, '<h1>An error occurred</h1>');
		}
	});
};