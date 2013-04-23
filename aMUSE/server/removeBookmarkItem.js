module.exports = function(req, res) {
	res.checkIfLogged(function(user) {
		var conn = res.mysqlCreateConnection();
		var object_id = req.params.object_id;
		conn.query(res.query.query_del_bookmark, [user.user_id, object_id], function(err, results) {
			if(err) res.send('error');
			else res.send('success');
		});
		conn.end();
	});
};