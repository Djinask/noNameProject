var hash_offset = 100000000;
var hash_range = Math.pow(2, 32) - 1 - hash_offset;
var hash = function() {
	return hash_offset + Math.floor(Math.random() * hash_range);
}

// GET REQUIRED BOUNDS FOR LOG IN
module.exports = function (req,res) {
	var email = req.body.email;
	var pass = req.body.password;

	res.contentType('text/plain');
	var conn = res.mysqlCreateConnection();
	conn.query(res.query.query_login, [email, pass], function(err, results) {
		if(err || results.length == 0)	{
			res.send('fail');
		} else {
			var h = hash();
			var user_id = results[0].user_id;
			var conn = res.mysqlCreateConnection();
			conn.query(res.query.query_change_hash, [h, user_id], function(err, results) {
				if(!err) {
					res.cookie('user', user_id);
					res.cookie('hash', h);
					res.send(user_id);
				} else {
					res.send('fail');
				}
				
			});
			conn.end();
		}
	});
	conn.end();
};