var imagemagick = require('imagemagick');
var fs = require('fs');

module.exports = function(req, res) {

	var connection = res.mysqlCreateConnection();
	connection.query(res.query.query_get_last_opera_id, function(result,error){
		if (error){
			console.log(error);
			res.send('Fatal error');
		}
		else {
			imagemagick.resize({
						srcPath: image_path,
						dstPath: '../public_html/photos/' + result[0] + '.jpg',
						quality: 0.8,
						format: 'jpg',
						progressive: false,
						width: 300,
						strip: false
					}, function(err, stdout, stderr) {
						if(err) {
							var conn = res.mysqlCreateConnection();
							conn.query();
							conn.end();
						} 
						fs.unlink(image_path);
						res.redirect('admin/add_menu');
					});

		}

	})

}