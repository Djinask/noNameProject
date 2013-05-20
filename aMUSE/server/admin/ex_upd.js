module.exports = function(req,res){
	var id = req.params.id;
	var ex_name = req.body.ex_name;
	var ex_desc = req.body.ex_desc
	var begin_date = req.body.begin_date;
	var end_date = req.body.end_date;

	var connection = res.mysqlCreateConnection();
	connection.query(res.query.query_reset_exhibition_by_id, [
		ex_name,
		begin_date,
		end_date,
		ex_desc,
		id
		], function(error,result){
		if (error){
			console.log(error);
			res.send("fatal error");
		} else{
			res.redirect('admin/exhibitions');
		}
	});
	connection.end();
}