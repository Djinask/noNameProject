var sql = require('./sql.js');
 
module.exports = function(req, res) {

	var photo, title, description;
	var newItem = [];
	var conn = res.mysqlCreateConnection();
	newItem[0] = req.params.photo;
	newItem[1] = req.params.title;
	newItem[2] = req.params.description;

	conn.query(sql./*add an item to the booklet*/, newItem, function(error, results) {
		if(error) res.send('An error occurred');
		else res.send('ok');
	});
	conn.end();
};