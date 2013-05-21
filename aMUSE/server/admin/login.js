var utils = require('../utils.js');

module.exports = function(req, res) {
	if(req.method == 'POST') {
		var hash = utils.hash();
		utils.simpleQuery(utils.sql.query_admin_login, [hash, req.body.name, req.body.password], function(error, result) {
			if(error || result.affectedRows == 0) {
				res.render('admin/login.html');
			} else {
				res.cookie('admin', req.body.name + ' ' + hash);
				res.redirect('/admin');
			}
		});
	} else {
		res.render('admin/login.html');
	}
};