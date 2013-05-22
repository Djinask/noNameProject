var message_html = '<div data-role="page"><div data-role="content"><h1>Operation was successful!</h1><a href="/mobileviews/myphotos" data-role="button" data-ajax="false">OK</a></div></div>';

module.exports = function(req, res) {
	req.checkIfLogged(res, function(user) {
		var conn = res.mysqlCreateConnection();
		if(req.params.action == 'delete' && req.params.id > 0) {
			conn.query(res.query.query_del_photo, [user.user_id, req.params.id], function(err, results) {
				if(err) console.log(err);
			});
			require('fs').unlink('../userphotos/' + parseInt(req.params.id) + '.jpg', function(err) {
				if(err) console.log(err);
			});
			res.send(message_html);
		} else {
			conn.query(res.query.query_select_photos, [user.user_id], function(err, results) {
				if(err)	{
					console.log(err);
				} else {
					data = {
						items: results
					};
					res.render('mobileviews/myphotos.html', data);
				}
			});
		}
		conn.end();
	});
};