// GET REQUIRED BOUNDS FOR LOG IN

//domain.com/mobileapi/email@email.it/miapassword
module.exports = function (req,res) {
	var email = req.params.email;
	var pass = req.params.pass;
	
	if(email && pass) {
		var conn = res.mysqlCreateConnection();
		conn.query(res.query.query_login, [email, pass], function(err, results) {
			if(err || results.length == 0)	{
				res.send('false');
			} else {
				res.send('true');
			}
		});
		conn.end();
	} else {
		res.send('false');
	}
};