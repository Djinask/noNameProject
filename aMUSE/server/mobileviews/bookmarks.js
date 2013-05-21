module.exports = function (req,res) {
	req.checkIfLogged(res, function(user) {
		var conn = res.mysqlCreateConnection();
		conn.query(res.query.query_get_bookmarks, [user.user_id], function(err, results) {
			if(err)	{
				console.log(err);
				res.send('Fatal error');
			} else {
				var items = {};
				var visits = {};
				var id;
				for(var i = 0; i < results.length; i++) {
					id = results[i].visit_id + '';
					if(visits[id] == undefined) {
						items[id] = [];
						visits[id] = new Date(results[i].visit_time).toLocaleDateString();
					}
					items[id].push(results[i]);
				}
				data = {
					email: user.email,
					items: items,
					visits: visits,
					empty: !results.length
				};
				res.render('mobileviews/bookmarks.html', data);
			}
		});
		conn.end();
	});
};