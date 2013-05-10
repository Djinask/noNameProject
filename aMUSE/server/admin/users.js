module.exports = function(req,res){
	var connection = res.mysqlCreateConnection();
	connection.query(res.query.query_get_users,function(error,result){
		if(error) {
			console.log(error);
			res.send('Fatale error');
		} else {
			res.render('admin/users.html', {
				all_users: result
			});
		}
	});
	connection.end();
}