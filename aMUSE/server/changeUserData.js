module.exports = function(req, res) {
	res.checkIfLogged(function(user) {
		var conn = res.mysqlCreateConnection();
		
		var newEmail = req.body.newEmail;
		var newPassword = req.body.newPassword;
		if(newEmail) {
			conn.query(res.query.query_change_email, [newEmail,user.user_id], function(err, results) {
				if(err) res.send('error');
				else res.send('success');
			});
		} else if(newPassword) {
			conn.query(res.query.query_change_password, [newPassword,user.user_id], function(err, results) {
				if(err) res.send('error');
				else res.send('success');
			});
		}
		conn.end();
	});
};