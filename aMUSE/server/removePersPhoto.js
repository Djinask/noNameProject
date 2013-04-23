var fs = require('fs');

module.exports = function(req, res) {
	res.checkIfLogged(function(user){
		var conn = res.mysqlCreateConnection();
		var photo_id = req.params.personal_photo_id;
		conn.query(res.query.query_del_photo, [user.user_id, photo_id], function(err, results) {
			if(err) res.send('error');
			else res.send('success');
		});
		conn.end();
		fs.unlink('../userphotos/'+photo_id+'.jpg');	
	});
};