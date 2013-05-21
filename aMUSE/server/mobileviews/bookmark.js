module.exports = function(req, res) {
	req.checkIfLogged(res, function(user) {
		var conn = res.mysqlCreateConnection();
		conn.query(res.query.query_select_object, [req.params.id], function(error, results) {
			if(error) {
				console.log(error);
				res.render('404.html');
			} else {
				res.render('mobileviews/object.html', {
					item: results[0]
				});
			}
		});
		conn.end();
	});
};