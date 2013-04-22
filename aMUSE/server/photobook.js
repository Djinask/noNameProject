var sql = require('./sql.js');

// GET REQUIRED BOUNDS FOR LOG IN
module.exports = function (req,res) {
	if(!req.cookies.user) {
		res.redirect('/photobook/login');
		return;
	}
	var conn = res.mysqlCreateConnection();
	conn.query('SELECT * FROM User WHERE user_id=?', [req.cookies.user], function(err, results) {
		if(err || results.length == 0)	{
			res.redirect('/photobook/login');
		} else {
			res.render('photobook/photobook.html', results[0]);
		}
	});
	conn.end();
};