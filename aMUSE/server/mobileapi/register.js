var utils = require('../utils.js');
var email_regex = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(([0-9]{1,3})|([a-zA-Z]{2,3})|(aero|coop|info|museum|name))$/;

var email1_1 = "<p>Ciao! La tua password è: ";
var email1_2 = "</p><p>Per visualizzare il tuo photobook vai al seguente link: <a herf=\"http://www.a-muse.herokuapp.com/photobook\">http://www.a-muse.herokuapp.com/photobook</a></p>";
var subject1 = "aMuse - Registration";


module.exports  = function(req, res) {
	var email = req.body.email;
	res.contentType('text/plain');
	if(!email_regex.test(email)) {
		res.send('not-valid');
	} else {
		var conn = utils.mysqlCreateConnection();
		conn.query(utils.sql.query_get_user_by_email, [email], function(error, results) {
			if(error) {
				res.send('fail');
			} else {
				if(results.length == 0) {
					utils.generateUrl(email, function(url) {
						var password = utils.generatePassword();
						var conn = utils.mysqlCreateConnection();
						conn.query(utils.sql.query_insert_user, [email, password, url], function(error, result) {
							if(error) {
								res.send('fail');
							} else {
								utils.sendEmail(email, subject1, email1_1 + password + email1_2);
								res.send('success');
							}
						});
						conn.end();
					});
				} else if(results.length == 1) {
					res.send('already-used');
				}
			}
		});
		conn.end();
	}
};