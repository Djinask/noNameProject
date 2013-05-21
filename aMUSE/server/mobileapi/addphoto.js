var imagemagick = require('imagemagick');
var fs = require('fs');

module.exports = function(req, res) {
	var user_id = req.body.id;
	var user_password = req.body.password;
	var photo = req.files ? req.files.photo : null;
	var title = req.body.title;
	var desc = req.body.description;
	if(photo && title && desc) {
		var conn = res.mysqlCreateConnection();
		conn.query(res.query.query_get_user, [user_id], function(err, result) {
			if(err) {
				res.send('fail');
			} else if(result[0].user_password != user_password) {
				res.send('fail');
			} else {
				var conn = res.mysqlCreateConnection();
				conn.query(res.query.query_insert_photo, [user_id, desc, title, 0], function(error, results) {
					if(error) {
						res.send('fail');
					} else {
						imagemagick.convert([
							photo.path,
							'-resize', '500x500>',
							'-size', '500x500',
							'-auto-orient',
							'xc:white',
							'+swap',
							'-gravity', 'center',
							'-composite',
							'../userphotos/' + results.insertId + '.jpg'
						], function(err, stdout, stderr) {
							if(err) {
								res.mysqlCreateConnection()
								.query(res.query.query_remove_presonal_photo, [results.insertId])
								.end();
								res.send('fail');
							} else {
								res.send('success');
							}
							fs.unlink(photo.path);
						});
					}
				});
				conn.end();
			}
		});
		conn.end();
	} else {
		res.send('fail');
	}
};