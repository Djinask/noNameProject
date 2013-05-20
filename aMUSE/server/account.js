var sendEmail = require('./mail.js');
var email_regex = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(([0-9]{1,3})|([a-zA-Z]{2,3})|(aero|coop|info|museum|name))$/;
var email1_1 = "<p>Ciao! La tua password è: ";
var email1_2 = "</p><p>Per visualizzare il tuo photobook vai al seguente link: <a herf=\"http://www.a-muse.herokuapp.com/photobook\">http://www.a-muse.herokuapp.com/photobook</a></p>";
var subject1 = "aMuse - Registration";
var subject2 = "aMuse - New bookmarks added";
var email2 = "<h3>You have just added new bookmarks to you photobook!</h3> <p>Login to aMuse to see your updated photobook and share it with your friends!</p>"

var generatePassword = function() {
	var text = "";
	var possible = "abcdefghilmnopqrstuvzxyjkw_-.1234567890!?ABCDEFGHILMNOPQRSTUVZXYJKW";
	var passLen = Math.floor(Math.random()*4)+6;		
	for(var i=0; i<passLen; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;	
};

var _insertBookmarks = function(visit, user, req, res) {
	var bookmarks = JSON.parse(req.cookies.bookmarks);
	var conn = res.mysqlCreateConnection();
	for(var id in bookmarks) {
		conn.query(res.query.query_insert_bookmark, [user, id, visit], function(error) {});
	}
	conn.end();
}

var insertBookmarks = function(user, req, res) {
	if(req.cookies.bookmarks) {
		var conn = res.mysqlCreateConnection();
		conn.query(res.query.query_get_last_visit, [user], function(error, results) {
			if(error) {
				console.log(error);
			} else {
				var now = new Date().getDay();
				var than;
				if(results.length > 0)
					than = new Date(results[0].visit_time).getDay();
				if(now != than) {
					var conn = res.mysqlCreateConnection();
					conn.query(res.query.query_insert_visit, [user], function(error, results) {
						if(error) console.log(error);
						else _insertBookmarks(results.insertId, user, req, res);
					});
					conn.end();
				} else {
					_insertBookmarks(results[0].visit_id, user, req, res);
				}
			}
		});
		conn.end();
	}
};

module.exports  = function(req, res) {
	var email = req.body.email_1;
	if(!email_regex.test(email)) {
		res.render('send.html', {
			message: "This e-mail doesn't seem to be valid"
		});
	} else if(email != req.body.email_2) {
		res.render('send.html', {
			message: "The e-mails don't match"
		});
	} else {
		var conn = res.mysqlCreateConnection();
		conn.query(res.query.query_get_user_by_email, [email], function(error, results) {
			if(error) {
				res.render('send.html', {
					message: "An error occurred! Please try again"
				});
			} else {
				if(results.length == 0) {
					var password = generatePassword();
					var conn = res.mysqlCreateConnection();
					conn.query(res.query.query_insert_user, [email, password], function(error, result) {
						if(error) {
							console.log(error);
							res.render('send.html', {
								message: "An error occurred! Please try again"
							});
						} else {
							sendEmail(email, subject1, email1_1 + password + email1_2);
							insertBookmarks(result.insertId, req, res);
							res.clearCookie('bookmarks');
							res.render('send.html', {
								redirect: true
							});
						}
					});
					conn.end();
				} else if(results.length == 1) {
					sendEmail(email, subject2, email2);
					insertBookmarks(results[0].user_id, req, res);
					res.clearCookie('bookmarks');
					res.render('send.html', {
						redirect: true
					});
				}
			}
		});
		conn.end();
	}
};