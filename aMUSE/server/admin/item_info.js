module.exports = function(req,res){
	var object_id = req.params.id;
	var connection = res.mysqlCreateConnection();
	connection.query(res.query.query_get_opera_by_id, [object_id],function(error,result){
		if(error) {
			console.log(error);
			res.send('Fatale error');
		} else {
			res.render('admin/item_info.html', {
				it_info: result[0]
			});
		}
	});
	connection.end();
}