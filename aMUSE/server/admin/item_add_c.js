module.exports = function(req,res){

	var connection = res.mysqlCreateConnection();
	connection.query(res.query.query_add_opera, [
		req.body.item_name,
		req.body.item_add_exhibition,
		req.body.item_add_section,
		req.body.author,
		req.body.item_add_description
	], function(error,result){
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