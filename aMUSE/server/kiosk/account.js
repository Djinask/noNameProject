var utils = require('../utils.js');
var email_regex = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(([0-9]{1,3})|([a-zA-Z]{2,3})|(aero|coop|info|museum|name))$/;

var email1_1 = "<p>Ciao! La tua password è: ";
var email1_2 = "</p><p>Per visualizzare il tuo photobook vai al seguente link: <a herf=\"http://www.a-muse.herokuapp.com/photobook\">http://www.a-muse.herokuapp.com/photobook</a></p>";
var subject1 = "aMuse - Registration";
var subject2 = "aMuse - New bookmarks added";
var email2 = "<h3>You have just added new bookmarks to you photobook!</h3> <p>Login to aMuse to see your updated photobook and share it with your friends!</p>"

var _insertBookmarks = function(visit, user, req) {
	var bookmarks = JSON.parse(req.cookies.bookmarks);
	var conn = utils.mysqlCreateConnection();
	for(var id in bookmarks) {
		conn.query(utils.sql.query_insert_bookmark, [user, id, visit], function(error) {});
	}
	conn.end();
}

var insertBookmarks = function(user, req) {
	if(req.cookies.bookmarks) {
		var conn = utils.mysqlCreateConnection();
		conn.query(utils.sql.query_get_last_visit, [user], function(error, results) {
			if(error) {
				console.log(error);
			} else {
				var now = new Date().getDay();
				var than;
				if(results.length > 0)
					than = new Date(results[0].visit_time).getDay();
				if(now != than) {
					var conn = utils.mysqlCreateConnection();
					conn.query(utils.sql.query_insert_visit, [user], function(error, results) {
						if(error) console.log(error);
						else _insertBookmarks(results.insertId, user, req);
					});
					conn.end();
				} else {
					_insertBookmarks(results[0].visit_id, user, req);
				}
			}
		});
		conn.end();
	}
};

module.exports  = function(req, res) {
	var email = req.body.email_1;
	if(!email_regex.test(email)) {
		res.render('kiosk/send.html', {
			message: "This e-mail doesn't seem to be valid"
		});
	} else if(email != req.body.email_2) {
		res.render('kiosk/send.html', {
			message: "The e-mails don't match"
		});
	} else {
		var conn = utils.mysqlCreateConnection();
		conn.query(utils.sql.query_get_user_by_email, [email], function(error, results) {
			if(error) {
				res.render('kiosk/send.html', {
					message: "An error occurred! Please try again"
				});
			} else {
				if(results.length == 0) {
					utils.generateUrl(email, function(url) {
						var password = utils.generatePassword();
						var conn = utils.mysqlCreateConnection();
						conn.query(utils.sql.query_insert_user, [email, password, url], function(error, result) {
							if(error) {
								console.log(error);
								res.render('kiosk/send.html', {
									message: "An error occurred! Please try again"
								});
							} else {
								utils.sendEmail(email, subject1, email1_1 + password + email1_2);
								insertBookmarks(result.insertId, req);
								res.clearCookie('bookmarks');
								res.render('kiosk/send.html', {
									redirect: true
								});
							}
						});
						conn.end();
					});
				} else if(results.length == 1) {
					sendEmail(email, subject2, email2);
					insertBookmarks(results[0].user_id, req);
					res.clearCookie('bookmarks');
					res.render('kiosk/send.html', {
						redirect: true
					});
				}
			}
		});
		conn.end();
	}
};