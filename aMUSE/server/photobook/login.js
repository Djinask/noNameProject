var utils = require('../utils.js');

// GET REQUIRED BOUNDS FOR LOG IN
module.exports = function (req, res) {
	var email = req.body.email;
	var pass = req.body.password;
	
	if(email && pass) {
		utils.simpleQuery(utils.sql.query_login, [email, pass], function(err, results) {
			if(err || results.length == 0)	{
				res.render('photobook/login.html', {error: true});
			} else {
				var h = utils.hash();
				var user_id = results[0].user_id;
				utils.simpleQuery(utils.sql.query_change_hash, [h, user_id], function(err, results) {
					if(!err) {
						res.cookie('user', user_id);
						res.cookie('hash', h);
						res.redirect('/photobook');
					} else {
						console.log(err);
						res.send('Fatal error');
					}
					
				});
			}
		});
	} else if(req.cookies.user) {
		res.redirect('/photobook');
	} else {
		res.render('photobook/login.html', {error: false});
	}	
};