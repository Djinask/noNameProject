module.exports = function(req, res) {
	res.contentType('text/plain');
	var user_id = req.body.id;
	var object_id = parseInt(req.body.object);
	if(object_id <= 0) {
		res.send('fail');
	}
	var user_password = req.body.password;
	var conn = res.mysqlCreateConnection();
	conn.query(res.query.query_get_last_visit, [user_id], function(error, results) {
		if(error || !results[0]) {
			res.send('fail');
		} else if(results[0].user_password != user_password) {
			res.send('fail');
		} else {
			var now = new Date().getDay();
			var than;
			if(results[0].visit_id)
				than = new Date(results[0].visit_time).getDay();
			if(now != than) {
				var conn = res.mysqlCreateConnection();
				conn.query(res.query.query_insert_visit, [user_id], function(error, results) {
					if(error) {
						res.send('fail')
					} else {
						var conn = res.mysqlCreateConnection();
						conn.query(res.query.query_insert_bookmark, [user_id, object_id, results.insertId], function(error) {
							if(error) {
								if(error.code == "ER_DUP_ENTRY") res.send('alreadyused');
								else res.send('fail');
							}
							else res.send('success');
						});
						conn.end();
					}
				});
				conn.end();
			} else {
				var conn = res.mysqlCreateConnection();
				conn.query(res.query.query_insert_bookmark, [user_id, object_id, results[0].visit_id], function(error) {
					if(error) {
						if(error.code == "ER_DUP_ENTRY") res.send('alreadyused');
						else res.send('fail');
					}
					else res.send('success');
				});
				conn.end();
			}
		}
	});
	conn.end();
};