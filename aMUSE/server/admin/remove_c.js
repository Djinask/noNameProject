var fs = require('fs');


module.exports = function(req,res){

var connection = res.mysqlCreateConnection();
var type = req.params.type;

	if (type == "items"){
		var object_id = req.params.id;
		connection.query(res.query.query_remove_opera_by_id, [object_id], function(error,result){ // informazioni dell'opera con quell'id
			if(error) {
				console.log(error);
				res.send('Fatal error');
			} else {
				fs.unlink("../public_html/photos/" + object_id + ".jpg");
				res.redirect('admin/items');
			}
		});
	}
	if (type == "authors"){
		var author_id = req.params.id;
		connection.query(res.query.query_remove_author_by_id, [author_id], function(error, result){
			if (error){
				console.log(error);
				res.send('Fatal error');
			} else {
				res.redirect('admin/authors');
			}
		});
	}

	if (type=="sections"){
		var section_id = req.params.id;
		connection.query(res.query.query_remove_section_by_id, [section_id], function(error, result){
			if (error){
				console.log(error);
				res.send('Fatal error');
			} else {
				res.redirect('admin/sections');
			}
		});

	}

	if (type == "exhibitions"){
		var exhibition_id = req.params.id;
		connection.query(res.query.query_remove_exhibition_by_id, [exhibition_id], function(error, result){
			if (error){
				console.log(error);
				res.send('Fatal error');
			} else {
				res.redirect('admin/exhibitions');
			}
		});

	}
	connection.end();
}