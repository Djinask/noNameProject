var sql = require('./sql.js');
 
module.exports = function(req, res) {

	var photo_id, title, description;
	var newItem = [];
	var conn = res.mysqlCreateConnection();
	newItem[0] = req.cookies.user;
	newItem[1] = req.body.description;
	newItem[2] = req.body.title;

	conn.query(sql.query_photobook_add, newItem, function(error, results) {
		if(error) res.send('An error occurred');
		else res.send('ok');
	});
	conn.end();
};