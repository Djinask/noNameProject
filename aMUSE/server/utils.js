var mail=require('nodemailer');
var mysql = require('mysql');
var crypto = require('crypto');
var sql = require('./sql.js');
var connection_data = {
	host: 'amuse.db.8861958.hostedresource.com',
	user: 'amuse',
	password: 'ABCdef123!',
	database: 'amuse'
};
var smtpTransport = mail.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "amuse.registrazione@gmail.com",
        pass: "ABCdef1234!!"
    }
});
var mailOptions = {
    from: "aMUSE registration <amuse.registrazione@gmail.com>", // sender address
    to: null, // list of receivers
    subject: null, // Subject line
    html: null // html body
}
var md5 = function(str) {
	return crypto.createHash('md5').update(str, 'utf8').digest('hex');
}

var copyInto = function(originPath, newName) {
    var path = require('path');
    var img = path.basename(originPath,'.jpg');
    img = newName + '.jpg';
    
    var fs = require('fs');
    var readStream = fs.createReadStream(originPath);
    readStream.pipe(fs.createWriteStream('../public_html/photos/' + img));
};

var generatePassword = function() {
	var text = "";
	var possible = "abcdefghilmnopqrstuvzxyjkw1234567890ABCDEFGHILMNOPQRSTUVZXYJKW";
	var passLen = Math.floor(Math.random()*4)+6;		
	for(var i=0; i<passLen; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;	
};

var mysqlCreateConnection = function() {
	var conn = mysql.createConnection(connection_data);
	conn.connect();
	return conn;
};

var simpleQuery = function(query, params, callback) {
	var conn = mysqlCreateConnection();
	conn.query(query, params, callback);
	conn.end();
};

var checkIfLogged = function(req, res, callback) {
	var id = req.cookies.user;
	var hash = req.cookies.hash;
	if(!id || !hash) {
		res.redirect('/photobook/login');
	} else {
		simpleQuery(sql.query_get_user, [id], function(err, results) {
			if(err) {
				res.send('Fatal error');
			} else if(results.length == 0) {
				res.clearCookie('user');
				res.clearCookie('hash');
				res.redirect('/photobook/login');
			} else {
				if(results[0].user_hash == hash) {
					callback(results[0]);
				} else {
					res.clearCookie('user');
					res.clearCookie('hash');
					res.redirect('/photobook/login');
				}
			}
		});
	}
};

var hash = function() {
	var hash_offset = 100000000;
	var hash_range = Math.pow(2, 32) - 1 - hash_offset;
	return hash_offset + Math.floor(Math.random() * hash_range);
}

var checkIfAdmin = function(req, res, next) {
	var admin = req.cookies.admin ? req.cookies.admin.split(' ') : null;
	if(admin) {
		simpleQuery(sql.query_check_if_admin, admin, function(error, result) {
			if(error || result.length == 0) {
				res.redirect('/admin/login');
			} else {
				next();
			}
		});
	} else {
		res.redirect('/admin/login');
	}
};

var generateUrl = function(email, callback) {
	var conn = mysqlCreateConnection();
	var hash = md5(email)
	conn.query(sql.query_get_user_by_url, [hash], function(err, res) {
		if(err) callback(null);
		else if(res.length == 0) callback(hash);
		else generateUrl(hash, callback);
	});
	conn.end();
}

var sendEmail = function(to, subject, text) {

    mailOptions.to = to;
    mailOptions.html = text;
    mailOptions.subject = subject;


    smtpTransport.sendMail(mailOptions, function(err, result){
      if(err) console.log(err);
    });
};

exports.generatePassword = generatePassword;
exports.sendEmail = sendEmail;
exports.copyInto = copyInto;
exports.checkIfLogged = checkIfLogged;
exports.generatePassword = generatePassword;
exports.mysqlCreateConnection = mysqlCreateConnection;
exports.generateUrl = generateUrl;
exports.simpleQuery = simpleQuery;
exports.hash = hash;
exports.checkIfAdmin = checkIfAdmin;
exports.sql = sql;