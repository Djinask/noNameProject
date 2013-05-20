module.exports = function(req,res){
	var author_id = req.params.id;
	var connection = res.mysqlCreateConnection();
	connection.query(res.query.query_get_authors_by_id, [author_id],function(error,result){
		if(error) {
			console.log(error);
			res.send('Fatal error');
		} else {
			res.render('admin/author_info.html', {
				author: result[0]
			});
		}
	});
	connection.end();
}