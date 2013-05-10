module.exports = function(req,res){
	var connection = res.mysqlCreateConnection();
	connection.query(res.query.query_get_sections, function(error,result){
		if(error) {
			console.log(error);
			res.send('Fatal error');
		} else {
			res.render('admin/sections.html', {
				sections: result
			});
		}
	});
	connection.end();
}