module.exports = function(req, res) {
	req.checkIfLogged(res, function(user) {
		var photo_id = req.params.name;
		var conn = res.mysqlCreateConnection();
		conn.query(res.query.query_is_photo_owner, [user.user_id, photo_id], function(err, result) {
			if(result.length === 1) {
				res.sendfile(req.params.name, {
					root: '../userphotos/'
				});
			} else {
				console.log("Illecit user photo access by user " + user.user_email);
				res.end();
			}
		});
		conn.end();
	})
};