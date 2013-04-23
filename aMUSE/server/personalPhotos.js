var imagemagick = require('imagemagick');
var fs = require('fs');
var messages = [
	'Photo successfully uploaded',
	'Invalid fields',
	'An error occurred during the upload'
];

module.exports = function(req, res) {
	req.checkIfLogged(res, function(user){
		var photo = req.files ? req.files.photo : null;
		var title = req.body.title;
		var desc = req.body.description;
		var output = {
			email: user.email
		};
		console.log(req.files);
		if(photo && title && desc) {
			var conn = res.mysqlCreateConnection();
			conn.query(sql.query_insert_photo, [user.user_id, desc, title], function(error, results) {
				if(error) res.send('Fatal error');
				else {
					imagemagick.resize({
						srcPath: photo.path,
						dstPath: '../userphotos/' + results.insertId + '.jpg',
						quality: 0.8,
						format: 'jpg',
						progressive: false,
						width: 300,
						strip: false
					}, function(err) {
						if(err) {
							output.message = messages[2];
							console.log(err);
						} else {
							output.message = messages[0];
						}
						fs.unlink(photo.path);
						res.render('photobook/addphoto.html', output);
					});
				}
			});
			conn.end();
		} else if(photo) {
			fs.unlink(photo.path);
			output.message = messages[1];
			res.render('photobook/addphoto.html', output);
		} else if(req.method == 'POST') {
			output.message = messages[1];
			res.render('photobook/addphoto.html', output);
		} else if(req.method == 'GET') {
			output.message = false;
			res.render('photobook/addphoto.html', output);
		}
	});
};