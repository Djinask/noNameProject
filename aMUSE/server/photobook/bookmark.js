module.exports = function(req, res) {
	req.checkIfLogged(res, function(user) {
		var conn = res.mysqlCreateConnection();
		conn.query(res.query.query_select_object, [req.params.id], function(error, results) {
			if(error) {
				console.log(error);
				res.render('404.html');
			} else {
				res.render('photobook/object.html', {
					item: results[0],
					email: user.email
				});
			}
		});
		conn.end();
	});
};