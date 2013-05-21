var utils = require('../utils.js');

module.exports = function(req, res) {
	res.contentType('text/plain');
	if(!req.body) {
		res.send('fail');
	} else {
		utils.simpleQuery(utils.sql.query_login, [req.body.email, req.body.password], function(error, result) {
			if(error || !result[0]) {
				res.send('fail');
			} else {
				res.send(result[0].user_url);
			}
		});
	}
}