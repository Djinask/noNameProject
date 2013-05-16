module.exports = function(req,res){

	var connection = res.mysqlCreateConnection();
	connection.query(res.query.query_add_section, [req.body.section_name], function(error,result){
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