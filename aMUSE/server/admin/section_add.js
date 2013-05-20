module.exports = function(req,res){
	var section_id = req.params.id;
	var connection = res.mysqlCreateConnection();
	connection.query(res.query.query_get_section_by_id, [section_id],function(error,result){
		if(error) {
			console.log(error);
			res.send('Fatal error');
		} else {
			res.render('admin/section_add.html', {
				section: result[0]
			});
		}
	});
	connection.end();
}