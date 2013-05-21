var utils = require('../utils.js');

module.exports = function(req, res) {
	utils.simpleQuery(utils.sql.query_check_if_photo_in_url, [req.params.hash, req.params.id], function(error, results) {
		if(error || results.length == 0) res.send(404);
		else {
			res.sendfile(req.params.id + '.jpg', {
				root: '../userphotos/'
			});
		}
	});
};