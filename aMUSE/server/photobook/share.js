var utils = require('../utils.js');

module.exports = function(req, res) {
	utils.checkIfLogged(req, res, function(user) {
		res.render('photobook/share.html', {
			hash: user.user_url
		});
	});
};