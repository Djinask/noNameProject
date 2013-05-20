module.exports = function(req, res) {
	req.checkIfLogged(res, function(user) {
		var data = {};
		if(req.method == "POST") {
			if(req.body.newpass.length >= 6 && req.body.newpass == req.body.confpass) {
				var conn = res.mysqlCreateConnection();
				conn.query(res.query.query_change_user_password, [req.body.newpass, user.user_id, req.body.oldpass], function(error, result) {
					if(error) data.message = "An error occurred, please try again later";
					else if(result.affectedRows == 0) data.message = "The inserted password doesn't match with your current one";
					else data.message = "Password successfully changed";
					res.render('photobook/changepassword.html', data);
				});
				conn.end();
			} else {
				data.message = "Please insert a valid password";
				res.render('photobook/changepassword.html', data);
			}
		} else {
			res.render('photobook/changepassword.html');
		}
	});
};