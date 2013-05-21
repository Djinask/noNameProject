var utils = require('../utils.js');

module.exports = function(req, res) {
	var conn = utils.mysqlCreateConnection();
	var offset = req.params.offset ? parseInt(req.params.offset) : 1;
	conn.query(utils.sql.query_get_photos_by_url, [req.params.hash, offset - 1], function(error, results) {
		if(error) {
			res.render("404.html");
		} else if(results.length == 0 && offset != 1) {
			res.render("404.html");
		} else {
			res.render("booklet/photos.html", {
				item: results[0],
				curr: offset,
				next: results[1] ? offset + 1 : undefined,
				prev: offset == 1 ? undefined : offset - 1,
				hash: req.params.hash
			});
		}
	});
	conn.end();
};