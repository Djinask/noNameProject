var express = require('express');
var swig = require('swig');
var consolidate = require('consolidate');
var http = require('http');
var app = express();
var mysql = require('mysql');

var connection_data = {
	host: 'amuse.db.8861958.hostedresource.com',
	user: 'amuse',
	password: 'ABCdef123!',
	database: 'amuse'
};
http.ServerResponse.prototype.mysqlCreateConnection = function() {
	var conn = mysql.createConnection(connection_data);
	conn.connect();
	return conn;
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
app.get('/photobook/login', require('./login.js'));
app.post('/photobook/login', require('./login.js'));
app.get('/photobook/logout', require('./logout.js'));

app.listen(8288);
