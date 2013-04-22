module.exports = function (req,res) {
	req.checkIfLogged(res, function(user) {
		var conn = res.mysqlCreateConnection();
		conn.query(res.query.query_get_bookmarks, [user.user_id], function(err, results) {
			if(err || results.length == 0)	{
				res.redirect('/photobook/login');
			} else {
				results.email = user.email;
				res.render('photobook/photobook.html', results);
			}
		});
		conn.end();
	});
	
};