module.exports = function(req,res){
	var object_id = req.params.id;
	var connection = res.mysqlCreateConnection();
	var array = [null,null];
	connection.query(res.query.query_get_opera_by_id, [object_id],function(error,result){ // informazioni dell'opera con quell'id
		if(error) {
			console.log(error);
			res.send('Fatal error');
		} else {
			array[0] = result[0];
		}
	});
	
	connection.query(res.query.query_get_authors,function(error,result){ // informazioni su tutti gli authors
		if(error) {
			console.log(error);
			res.send('Fatal error');
		} else {
			array[1] = result;
		}
	});
	connection.query(res.query.query_get_exhibitions,function(error,result){ // informazioni su tutte le exhibition
		if(error) {
			console.log(error);
			res.send('Fatal error');
		} else {
			array[2] = result;
		}
	});
    connection.query(res.query.query_get_sections,function(error,result){ // informazioni su tutte le section
		if(error) {
			console.log(error);
			res.send('Fatal error');
		} else {
			array[3] = result;
		}
	});
	connection.end(function(){
		res.render('admin/item_info.html', {
				it_info: array[0], // info dell'opera
				authors : array[1], // tutti gli autori
				exhibitions: array[2], // tutte le exhibition
				sections: array[3] // tutte le sections
		});
	})
}
