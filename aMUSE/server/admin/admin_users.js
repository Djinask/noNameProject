module.exports = function(req, res) {
	var connection = res.mysqlCreateConnection();
	connection.query(res.query.query_get_admin_users, function(error,result){
		if (error){
			res.send(error);
			console.log("Fatal Error");
		}
		else {
			res.render("admin/admin_users.html", {
				all_admin_users: result
			});
		}
	});
	connection.end();

}