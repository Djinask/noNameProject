module.exports = function(req,res){
	var connection = res.mysqlCreateConnection();
	connection.query(res.query.query_get_authors_in_alpha_order, function(error,result){
		if(error) {
			console.log(error);
			res.send('Fatale error');
		} else {
			res.render('admin/authors.html', {
				authors: result
			});
		}
	});
	connection.end();
}