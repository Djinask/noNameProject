module.exports = function(req,res){

	var connection = res.mysqlCreateConnection();
	connection.query(res.query.query_add_author, [req.body.author_name], function(error,result){
		if (error){
			console.log(error)
			res.send("fatal error")
		}
		else {
			res.redirect("/admin/add_menu")
		}
	});
	connection.end();
}