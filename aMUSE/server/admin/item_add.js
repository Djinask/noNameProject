module.exports = function(req,res){
	var object_id = req.params.id;
	var connection = res.mysqlCreateConnection();
	var array = [null,null];

	
	connection.query(res.query.query_get_authors,function(error,result){ // informazioni su tutti gli authors
		if(error) {
			console.log(error);
			res.send('Fatal error');
		} else {
			array[0] = result;
		}
	});
	connection.query(res.query.query_get_exhibitions,function(error,result){ // informazioni su tutte le exhibition
		if(error) {
			console.log(error);
			res.send('Fatal error');
		} else {
			array[1] = result;
		}
	});
    connection.query(res.query.query_get_sections,function(error,result){ // informazioni su tutte le section
		if(error) {
			console.log(error);
			res.send('Fatal error');
		} else {
			array[2] = result;
		}
	});
	connection.end(function(){
		res.render('admin/item_add.html', {
				 
				authors : array[0], // tutti gli autori
				exhibitions: array[1], // tutte le exhibition
				sections: array[2] // tutte le sections
		});
	})
}
