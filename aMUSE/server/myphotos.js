module.exports = function(req, res) {
	req.checkIfLogged(res, function(user) {
		var conn = res.mysqlCreateConnection();
		conn.query(res.query.query_select_photos, [user.user_id], function(err, results) {
			if(err)	{
				console.log(err);
				res.send('Fatal error');
			} else {
				var items = [];
				for(var i = 0; i < results.length; i+=4) {
					items.push(Array.prototype.slice.call(results, i, i+4));
				}
				data = {
					email: user.email,
					items: items
				};
				res.render('photobook/myphotos.html', data);
			}
		});
		conn.end();
	});
};