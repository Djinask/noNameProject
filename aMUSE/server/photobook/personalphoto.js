module.exports = function(req, res) {
	var conn = res.mysqlCreateConnection();
	conn.query(res.query.query_get_photo, [req.params.id], function(error, results) {
		if(error) {
			console.log(error);
			res.render('404.html');
		} else {
			res.render('photobook/personalphoto.html', {
				item: results[0]
			});
		}
	});
	conn.end();
};