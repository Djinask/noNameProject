module.exports = function(req,res){
	var connection = res.mysqlCreateConnection();
	var array = [null,null];
	connection.query(res.query.query_data,function(error,result){
		if(error) {
			console.log(error);
			res.send('Fatal error');
		} else {
			array[0] = result;

		}
	});
	connection.query(res.query.query_get_exhibitions, function(error,result){
		if (error){
			console.log(error);
			res.send("Fatal error");
		} else {
			array[1] = result;
		}
	});

	connection.end(function(){
			res.render('admin/items.html', {
				operas: array[0],
				exhibitions : array[1]

			});
	});
}