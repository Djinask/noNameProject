var email_regex = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(([0-9]{1,3})|([a-zA-Z]{2,3})|(aero|coop|info|museum|name))$/;

module.exports = function(req, res) {
	req.checkIfLogged(res, function(user) {
		var data = {};
		if(req.method == "POST") {
			if(email_regex.test(req.body.email) && req.body.email == req.body.conf) {
				var conn = res.mysqlCreateConnection();
				conn.query(res.query.query_change_user_email, [req.body.email, user.user_id, req.body.pass], function(error, result) {
					if(error) data.message = "An error occurred, please try again later";
					else if(result.affectedRows == 0) data.message = "The inserted password doesn't match with your current one";
					else data.message = "E-mail successfully changed";
					res.render('photobook/changeemail.html', data);
				});
				conn.end();
			} else {
				data.message = "Please insert a valid e-mail";
				res.render('photobook/changeemail.html', data);
			}
		} else {
			res.render('photobook/changeemail.html');
		}
	});
};