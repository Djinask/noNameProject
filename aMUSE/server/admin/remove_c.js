var fs = require('fs');


module.exports = function(req,res){

	var connection = res.mysqlCreateConnection();
	var type = req.params.type;
	

	if (type == "items"){
		
		var data = {};
		var object_id = req.params.id;
		connection.query(res.query.query_check_if_bookmarked, [object_id], function(error,result){
			data.type = type;
			if (error){
				console.log(error);
				data.message = "Connection error";
			} else {
				if (result.length == 0) {
					var conn = res.mysqlCreateConnection()
					conn.query(res.query.query_remove_opera_by_id, [object_id], function(error,result){ // informazioni dell'opera con quell'id
						if(error) {
							console.log(error);
							data.message = "Connection error";
						} else {
							fs.unlink("../public_html/photos/" + object_id + ".jpg", function(err) {
								console.log(err);
								data.message = "Object successfully removed";

							});
						}
						
					});
					conn.end();
				} else {
					data.message = "This object has already been bookmarked";
				}
			}
			res.render('admin/remove_message.html', {
				message: data.message,
				type: data.type
			});		
		});
		connection.end(function() {
			//res.redirect('admin/items');
		});
	}
	else if (type == "authors"){
		var author_id = req.params.id;
		connection.query(res.query.query_remove_author_by_id, [author_id], function(error, result){
			if (error){
				console.log(error);
			}
		});
		connection.end(function() {
			res.redirect('admin/authors');
		});
	}

	else if (type=="sections"){
		var section_id = req.params.id;
		connection.query(res.query.query_remove_section_by_id, [section_id], function(error, result){
			if (error){
				console.log(error);
			}
		});
		connection.end(function() {
			res.redirect('admin/sections');
		});
	}

	else if (type == "exhibitions"){
		var exhibition_id = req.params.id;
		connection.query(res.query.query_remove_exhibition_by_id, [exhibition_id], function(error, result){
			if (error){
				console.log(error);
			}
		});
		connection.end(function() {
			res.redirect('admin/exhibitions');
		});
	}

	else if (type == "users"){
		var user_id = req.params.id;
		
		connection.query(res.query.query_remove_bookmarked, [user_id], function (error,result){
			if (error) {
				console.log(error);
			} 
		});
		
		connection.query(res.query.query_get_personal_photos_by_user_id, [user_id], function(error,result){
			if (error){
				console.log(error);
			}
			else {
				for(var i = 0; i < result.length; i++) {
					fs.unlink("../userphotos/" + result[i].personalphoto_id + ".jpg");
				}
			}
			var connection = res.mysqlCreateConnection();
			connection.query(res.query.query_remove_personal_photos, [user_id], function(error,result){
				if (error){
					console.log(error);
				}
			});
			connection.end();
		});

		connection.query(res.query.query_remove_user, [user_id], function(error, result){
			if (error){
				console.log(error);
			}
		});
		connection.end(function() {
			res.redirect('admin/users');
		});
	}
	
	else if (type == "admin_users"){

		var length;
		var admin_name = req.params.id;
		var conn = res.mysqlCreateConnection() 
		connection.query(res.query.query_get_all_admin_users, function(error,result){
			if (error){
				console.log(error);
			}
			else{
				if (result.length >=2){
					conn.query(res.query.query_remove_admin_user_by_name, [admin_name], function(error,result){
						if (error){
							console.log(error);
						}	
						conn.end();		
					});
				}
				else {
					conn.end();
				}
			} 

		});
		
		connection.end(function() {
			res.redirect('admin/admin_users');
		});
	
	}
	else {
		connection.end();
	}
}