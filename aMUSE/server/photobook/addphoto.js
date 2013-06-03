var imagemagick = require('imagemagick');
var fs = require('fs');
var messages = [
	'Photo successfully uploaded',
	'Invalid fields',
	'An error occurred during the upload'
];

var renderPage = function(user, res, out) {
	var data = {};
	for(var key in out) data[key] = out[key];
	var conn = res.mysqlCreateConnection();
	conn.query(res.query.query_get_bookmarks, [user.user_id], function(err, results) {
		if(err) {
			console.log(err);
		}
		data.bookmarks = results;
		res.render('photobook/addphoto.html', data);
	});
	conn.end();
};

module.exports = function(req, res) {
	req.checkIfLogged(res, function(user){
		var photo = req.files ? req.files.photo : null;
		var title = req.body.title;
		var desc = req.body.description;
		var obj = req.body.object;
		var output = {};
		if(photo && title && desc && obj) {
			var conn = res.mysqlCreateConnection();
			conn.query(res.query.query_insert_photo, [user.user_id, desc, title, obj], function(error, results) {
				if(error) {
					console.log(error);
					output.message = messages[2];
					renderPage(user, res, output);
				} else {
					try {
						imagemagick.convert([
								photo.path,
								'-resize', '500x500>',
								'-size', '500x500',
								'xc:white',
								'+swap',
								'-gravity', 'center',
								'-composite',
								'../userphotos/' + results.insertId + '.jpg'
							], function(err, stdout, stderr) {
							if(err) {
								console.log(err);
								output.message = messages[2];
								res.mysqlCreateConnection()
								.query(res.query.query_remove_personal_photo, [results.insertId])
								.end();
							} else {
								output.message = messages[0];
							}
							fs.unlink(photo.path);
							renderPage(user, res, output);
						});
					} catch(e) {
						console.log(e);
					}
				}
			});
			conn.end();
		} else if(photo) {
			fs.unlink(photo.path);
			output.message = messages[1];
			renderPage(user, res, output);
		} else if(req.method == 'POST') {
			output.message = messages[1];
			renderPage(user, res, output);
		} else if(req.method == 'GET') {
			output.message = false;
			renderPage(user, res, output);
		}
	});
};