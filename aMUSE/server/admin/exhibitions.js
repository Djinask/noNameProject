module.exports = function(req,res){
	var connection = res.mysqlCreateConnection();
	connection.query(res.query.query_get_exhibitions, function(error,result){
		if(error) {
			console.log(error);
			res.send('Fatale error');
		} else {
			res.render('admin/exhibitions.html', {
				exhibitions: result
			});
		}
	});
	connection.end();
}