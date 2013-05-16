module.exports = function(req,res){

	var connection = res.mysqlCreateConnection();
	connection.query(res.query.query_add_exhibition, [
		req.body.name,
		req.body.beg_date,
		req.body.end_date,
		req.body.desc
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