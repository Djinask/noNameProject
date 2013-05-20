module.exports = function(req,res){
	var item_id = req.params.id;
	var item_type = req.params.type;
	console.log(item_id);
	res.render('admin/remove.html', { 
		
		id: item_id,
		type: item_type
	});
}
	