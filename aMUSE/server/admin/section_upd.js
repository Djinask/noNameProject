module.exports = function(req,res){
	var id = req.params.id;
	var connection = res.mysqlCreateConnection();
	connection.query(res.query.query_reset_section_name, [req.body.section_name,id], function(error,result){
		if (error){
			console.log(error);
			res.send("fatal error");
		} else{
			res.redirect('admin/sections');
		}
	});
	connection.end();
}