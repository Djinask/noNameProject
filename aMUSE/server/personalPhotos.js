var imagemagick = require('imagemagick');
var fs = require('fs');
var messages = [
	'Photo successfully uploaded',
	'Invalid fields',
	'An error occurred during the upload',
	'Fata error'
];

module.exports = function(req, res) {
	res.checkIfLogged(function(user){
		var photo = req.files.photo;
		var title = req.body.title;
		var desc = req.body.description;
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
							res.render('photobook/addphoto.html', {message: messages[2]});
							console.log(err);
						} else {
							res.render('photobook/addphoto.html', {message: messages[0]});
						}
						fs.unlink(photo.path);
					});
				}
			});
			conn.end();
		} else if(photo) {
			fs.unlink(photo.path);
		} else {
			res.render('photobook/addphoto.html', {success: false});
		}
	});
};