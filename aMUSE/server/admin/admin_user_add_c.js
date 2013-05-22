module.exports = function(req, res) {
	var messagge = [];
	var pass1 = req.body.admin_pass1;
	var pass2 = req.body.admin_pass2;
	var name = req.body.admin_name;

	if (pass1 == pass2){
		var connection = res.mysqlCreateConnection();
		connection.query(res.query.query_add_admin_user, [pass1,name], function(error,result){
			if (error){
				res.send('Fatal error');
				console.log(error);
			}
			else {
				messagge = "Admin Account Created";
				res.render('admin/admin_users_messagge.html', {
					messagge: messagge
				});

			}
		});
		connection.end();
	}
	else {
		messagge = "Password don't match or connession problem"
		res.render('admin/admin_users_messagge.html', {
			messagge: messagge
		});
	}
	
}