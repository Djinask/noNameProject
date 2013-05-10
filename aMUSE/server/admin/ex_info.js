module.exports = function(req,res){
	var exhibition_id = req.params.id;
	var connection = res.mysqlCreateConnection();
	connection.query(res.query.query_get_exhibition_by_id, [exhibition_id],function(error,result){
		if(error) {
			console.log(error);
			res.send('Fatal error');
		} else {
			res.render('admin/ex_info.html', {
				exhibitions: result[0]
			});
		}
	});
	connection.end();
}