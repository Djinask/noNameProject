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
				if(results[0].user_hash == hash) {
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
app.use(express.bodyParser({
	keepExtensions: true,
	uploadDir: '../tmp'
}));
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
app.post('/signup', require('./account.js'));
app.get('/signup', function(req, res) {
	res.render('send.html');
});

var home = require('./home.js');
app.get('/', home);
app.get('/items/:selection', home);

app.get('/photobook', require('./photobook.js'));
app.get('/photobook/bookmarks', require('./bookmarks.js'));
app.get('/photobook/login', require('./login.js'));
app.post('/photobook/login', require('./login.js'));
app.post('/photobook/addphoto', require('./addphoto.js'));
app.get('/photobook/logout', require('./logout.js'));
app.get('/photobook/addphoto', require('./addphoto.js'));
app.get('/photobook/photos/:name', require('./userphoto.js'));
app.get('/photobook/myphotos', require('./myphotos.js'));
app.get('/photobook/object/:id', require('./bookmark.js'));


//ADMIN SECTION

var admin_items = require ('./admin/items.js');

app.get('/admin/qrcode/:id', require('./qrcodeGen.js'));

// remove section
app.get('/admin/items/remove/:type/:id', require ('./admin/remove.js'));
app.get('/admin/items/remove/c/:type/:id', require ('./admin/remove_c.js'));
app.get('/admin/authors/remove/:type/:id', require ('./admin/remove.js'));
app.get('/admin/sections/remove/:type/:id', require ('./admin/remove.js'));
app.get('/admin/exhibitions/remove/:type/:id', require ('./admin/remove.js'));
// add section
app.post('/admin/add_menu/exhibition_add', require ("./admin/ex_add_c.js"));
app.post('/admin/add_menu/author_add', require ("./admin/author_add_c.js"));
app.post('/admin/add_menu/section_add', require ("./admin/section_add_c.js"));
app.post('/admin/add_menu/item_add', require ("./admin/item_add_c.js"));

// get section
app.get('/admin/items', admin_items);
app.get('/admin/exhibitions', require('./admin/exhibitions.js'));
app.get('/admin', require ('./admin/home.js'));
app.get('/admin/exhibitions/:id', require('./admin/ex_info.js'));
app.get('/admin/items/:filter/:id', admin_items);
app.get('/admin/items/:id', require('./admin/item_info.js'));
app.get('/admin/authors', require ('./admin/authors.js'));
app.get('/admin/users', require ('./admin/users.js'));
app.get('/admin/sections', require ('./admin/sections.js'));
app.get('/admin/authors/:id', require ('./admin/author_info.js'));
app.get('/admin/sections/:id', require('./admin/section_info.js'));
app.get('/admin/add_menu', require ('./admin/add_menu.js'));
app.get('/admin/add_menu/author_add', require ('./admin/author_add.js'));
app.get('/admin/add_menu/ex_add', require ('./admin/ex_add.js'));
app.get('/admin/add_menu/item_add', require ('./admin/item_add.js'));
app.get('/admin/add_menu/section_add', require ('./admin/section_add.js'));

//mobileapi
app.get('/mobileapi/login/:email/:pass', require('./mobileapi/login.js'));

app.listen(process.env.PORT || 8288);
