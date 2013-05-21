var imagemagick = require('imagemagick');
var fs = require('fs');

module.exports = function(req, res){
	var id = req.body.id;
	var object_name = req.body.object_name;
	var object_desc = req.body.object_desc;
	var object_author = req.body.object_author;
	var object_section = req.body.object_section;
	var object_ex = req.body.object_ex;
	var image = req.files ? req.files.image : null;
	
	if(object_name && object_desc && object_author && object_section && object_ex) {
		var connection = res.mysqlCreateConnection();
		connection.query(res.query.query_reset_opera_name, [
			object_name,
			object_desc,
			object_author,
			object_ex,
			object_section,
			id
		], function(error,result){
			if (error){
				console.log(error)
				res.send("fatal error")
			} else {
					if (image){
						imagemagick.convert([
							image.path,
							'-resize', '300x300>',
							'-size', '300x300',
							'xc:white',
							'+swap',
							'-gravity', 'center',
							'-composite',
							'../public_html/photos/' + parseInt(id) + '.jpg'
						], function(err, stdout, stderr) {
							if(err) {
								console.log(err);
							} 
							fs.unlink(image.path);
							res.redirect('admin/items');
						});
					} else {
						res.redirect('admin/items')
					}
				}
			});
			connection.end();
		}
}