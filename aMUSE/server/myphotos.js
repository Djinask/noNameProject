module.exports = function(req, res) {
	req.checkIfLogged(res, function(user) {
		var conn = res.mysqlCreateConnection();
		conn.query(res.query.query_select_photos, [user.user_id], function(err, results) {
			if(err)	{
				console.log(err);
			} else {
				data = {
					items: results
				};
				res.render('photobook/myphotos.html', data);
			}
		});
		conn.end();
	});
};