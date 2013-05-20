module.exports = function(req,res){
	var id = req.params.id;
	var connection = res.mysqlCreateConnection();
	connection.query(res.query.query_reset_author_name, [req.body.author_name,id], function(error,result){
		if (error){
			console.log(error);
			res.send("fatal error");
		} else{
			res.redirect('admin/authors');
		}
	});
	connection.end();
}