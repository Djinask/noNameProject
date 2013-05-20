module.exports = function(req, res) {
	var user_id = req.body.id;
	var object_id = req.body.object;
	var user_password = req.body.password;
	var conn = res.mysqlCreateConnection();
	res.contentType('text/plain');
	conn.query(res.query.query_get_last_visit, [user_id], function(error, results) {
		if(error) {
			res.send('fail');
		} else {
			var now = new Date().getDay();
			var than;
			if(results.length > 0)
				than = new Date(results[0].visit_time).getDay();
			if(now != than) {
				var conn = res.mysqlCreateConnection();
				conn.query(res.query.query_insert_visit, [user_id], function(error, results) {
					if(error) {
						res.send('fail');
					} else {
						var conn = res.mysqlCreateConnection();
						conn.query(res.query.query_insert_bookmark, [user_id, object_id, results.insertId], function(error) {
							if(error) res.send('fail');
							else res.send('success');
						});
						conn.end();
					}
				});
				conn.end();
			} else {
				var conn = res.mysqlCreateConnection();
				conn.query(res.query.query_insert_bookmark, [user_id, object_id, results[0].visit_id], function(error) {
					if(error) res.send('fail');
					else res.send('success');
				});
				conn.end();
			}
		}
	});
	conn.end();
};