module.exports = function(req,res){
	var connection = res.mysqlCreateConnection();
	var array = [null,null];
	var filter = req.params.filter;
	var filter_id = req.params.id;

	if(filter && filter_id) {
		switch (filter){
			case "exhibition":
				connection.query(res.query.query_select_object_by_exhibition, [filter_id,0],function(error,result){
					if (error){
						console.log(error);
						res.send(error);
					} else {
						array[0] = result;
					}
				});
			break;

			case "author":
				connection.query(res.query.query_select_object_by_author, [filter_id,0],function(error,result){
					if (error){
						console.log(error);
						res.send(error);
					} else {
						array[0] = result;
					}
				});
			break;
			case "section":
				connection.query(res.query.query_select_object_by_section, [filter_id,0], function(error,result){
					if (error){
						console.log(error);
						res.send(error);
					} else {
						array[0] = result;
					}
				});
			break;
 		}

	}

	else {
	connection.query(res.query.query_data,function(error,result){
		if(error) {
			console.log(error);
			res.send('Fatal error');
		} else {
			array[0] = result;

		}
	});
	} 
	connection.query(res.query.query_get_exhibitions, function(error,result){
		if (error){
			console.log(error);
			res.send("Fatal error");
		} else {
			array[1] = result;
		}
	});
	connection.query(res.query.query_get_authors, function(error,result){
		if (error){
			console.log(error);
			res.send("Fatal error");
		} else {
			array[2] = result;
		}
	});
	connection.query(res.query.query_get_sections, function(error,result){
		if (error){
			console.log(error);
			res.send("Fatal error");
		} else {
			array[3] = result;
		}
	});

	connection.end(function(){
			res.render('admin/items.html', {
				operas: array[0],
				exhibitions : array[1],
				authors: array[2],
				sections: array[3]

			});
	});
}