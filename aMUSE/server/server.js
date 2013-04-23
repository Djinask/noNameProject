var express = require('express');
var swig = require('swig');
var consolidate = require('consolidate');
var http = require('http');
var app = express();
var mysql = require('mysql');
var query = require('./sql.js');

var connection_data = {
	host: 'amuse.db.8861958.hostedresource.com',
	user: 'amuse',
	password: 'ABCdef123!',
	database: 'amuse'
};
var mysqlCreateConnection = function() {
	var conn = mysql.createConnection(connection_data);
	conn.connect();
	return conn;
};
http.ServerResponse.prototype.mysqlCreateConnection = mysqlCreateConnection;
http.ServerResponse.prototype.query = query;
http.ServerResponse.prototype.mysqlCreateConnection = function() {
	var conn = mysql.createConnection(connection_data);
	conn.connect();
	return conn;
};
http.IncomingMessage.prototype.checkIfLogged = function(res, callback) {
	var id = this.cookies.user;
	var hash = this.cookies.hash;
	if(!id || !hash) {
		res.redirect('/photobook/login');
	} else {
		var conn = mysqlCreateConnection();
		conn.query(query.query_get_user, [id], function(err, results) {
			if(err) {
				res.send('Fatal error');
			} else {
				if(results[0].hash == hash) {
					callback(results[0]);
				} else {
					res.clearCookie('user');
					res.clearCookie('hash');
					res.redirect('/photobook/login');
				}
			}
		});
		conn.end();
	}
};

app.use(express.cookieParser('muhahaha'));
app.use(express.bodyParser());
app.engine('.html', consolidate.swig);
app.set('view engine', 'html');
app.set('views', '../public_html');
swig.init({
  allowErrors: false,
  autoescape: true,
  cache: true,
  encoding: 'utf8',
  root: "../public_html"
});

app.use('/static', express.static('../public_html'));

app.get('/object/:id', require('./object.js'));
app.get('/signup/:email', require('./account.js'));

//var gallery = require('./gallery.js');
//app.get('/gallery/:selection', gallery);
//app.get('/gallery', gallery);

var home = require('./home.js');
app.get('/', home);
app.get('/items/:selection', home);

app.get('/photobook', require('./photobook.js'));
app.get('/photobook/bookmarks', require('./bookmarks.js'));
app.get('/photobook/login', require('./login.js'));
app.post('/photobook/login', require('./login.js'));
app.get('/photobook/logout', require('./logout.js'));

app.listen(8288);
