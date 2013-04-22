module.exports = function(req, res) {
	var filters;
	if(req.params.selection) {
		filters = req.params.selection.split('-');
                console.log(filters);
	} else {
		var conn = res.mysqlCreateConnection();
		conn.query('SELECT * FROM Object LIMIT 24', function(error, results) {
			res.render('index0.html', {
				items: results
			});
		});
		conn.end();
	}
};