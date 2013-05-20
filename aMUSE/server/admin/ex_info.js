module.exports = function(req,res){
	var exhibition_id = req.params.id;
	var connection = res.mysqlCreateConnection();
	connection.query(res.query.query_get_exhibition_by_id, [exhibition_id],function(error,result){
		if(error) {
			console.log(error);
			res.send('Fatal error');
		} else {
			result[0].exhibition_begin = new Date(result[0].exhibition_begin);
			result[0].exhibition_end = new Date(result[0].exhibition_end);
			res.render('admin/ex_info.html', {
				exhibitions: result[0]
			});
		}
	});
	connection.end();
}