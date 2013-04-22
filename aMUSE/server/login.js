var sqls = require('./sql.js');

// GET REQUIRED BOUNDS FOR LOG IN
module.exports = function (req,res) {
	var email = req.body.email;
	var pass = req.body.password;
	
	if(email && pass) {
		var conn = res.mysqlCreateConnection();
		conn.query('SELECT * FROM User WHERE email=? AND password=?', [email, pass], function(err, results) {
			if(err || results.length == 0)	{
				res.render('photobook/login.html', {error: true});
			} else {
				res.cookie('user', results[0].user_id);
				res.redirect('/photobook');
			}
		});
		conn.end();
	} else if(req.cookies.user) {
		res.redirect('/photobook');
	} else {
		res.render('photobook/login.html', {error: false});
	}	
};