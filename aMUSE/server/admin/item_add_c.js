var imagemagick = require('imagemagick');
var fs = require('fs');


module.exports = function(req, res) {
	var image = req.files ? req.files.image : null;
	if(image && req.body.item_name && req.body.item_add_exhibition && req.body.item_add_section && req.body.author && req.body.item_add_description) {
		var connection = res.mysqlCreateConnection();
		connection.query(res.query.query_add_opera, [
			req.body.item_name,
			req.body.item_add_exhibition,
			req.body.item_add_section,
			req.body.author,
			req.body.item_add_description
		], function(error,result){
			if (error){
				console.log(error)
				res.send("fatal error")
			} else {	
				imagemagick.convert([
						image.path,
						'-resize', '300x300>',
						'-size', '300x300',
						'xc:white',
						'+swap',
						'-gravity', 'center',
						'-composite',
						'../public_html/photos/' + result.insertId + '.jpg'
					], function(err, stdout, stderr) {
						if(err) {
							console.log(err);
							var conn = res.mysqlCreateConnection();
							conn.query(res.query.query_remove_opera_by_id, [result.insertId]);
							conn.end();
						} 
						fs.unlink(image.path);
						res.redirect('admin/add_menu');
					});
				}
			
			//else {
			//	res.render("/admin/add_opera_image", {
			//		image_path: image.path
			//	});
			//	res.redirect('./admin/add_menu');
			//}
		});
		connection.end();
	}
}