module.exports = function(req, res) {
	var conn = res.mysqlCreateConnection();
	conn.query(res.query.query_select_object, [req.params.id], function(error, results) {
		if(error) {
			console.log(error);
			res.render('404.html');
		} else {
			console.log(req.cookies);
			var bookmarked = req.cookies.bookmarks ? JSON.parse(req.cookies.bookmarks)[results[0].object_id+''] : false;
			res.render('kiosk/object.html', {
				item: results[0],
				bookmarked: bookmarked
			});
		}
	});
	conn.end();
};