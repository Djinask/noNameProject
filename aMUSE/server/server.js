var express = require('express');
var swig = require('swig');
var consolidate = require('consolidate');
var http = require('http');
var app = express();
var mysql = require('mysql');
var query = require('./sql.js');
var utils = require('./utils.js');

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
		conn.end();
	}
};

app.use(express.cookieParser('muhahaha'));
app.use(express.limit('5mb'));
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


//KIOSK SECTION
app.get('/object/:id', require('./kiosk/object.js'));
app.post('/signup', require('./kiosk/account.js'));
app.get('/signup', function(req, res) {
	res.render('kiosk/send.html');
});
var home = require('./kiosk/home.js');
app.get('/', home);
app.get('/items/:selection', home);

//PHOTOBOOK SECTION
app.get('/photobook', require('./photobook/photobook.js'));
app.get('/photobook/bookmarks', require('./photobook/bookmarks.js'));
app.get('/photobook/login', require('./photobook/login.js'));
app.post('/photobook/login', require('./photobook/login.js'));
app.post('/photobook/addphoto', require('./photobook/addphoto.js'));
app.get('/photobook/changeemail', require('./photobook/changeemail.js'));
app.get('/photobook/changepassword', require('./photobook/changepassword.js'));
app.post('/photobook/changeemail', require('./photobook/changeemail.js'));
app.post('/photobook/changepassword', require('./photobook/changepassword.js'));
app.get('/photobook/logout', require('./photobook/logout.js'));
app.get('/photobook/addphoto', require('./photobook/addphoto.js'));
app.get('/photobook/photos/:name', require('./photobook/userphoto.js'));
app.get('/photobook/myphotos', require('./photobook/myphotos.js'));
app.get('/photobook/myphotos/:action/:id', require('./photobook/myphotos.js'));
app.get('/photobook/bookmarks/:id', require('./photobook/bookmark.js'));
app.get('/photobook/myphotos/:id', require('./photobook/personalphoto.js'));
app.get('/photobook/share', require('./photobook/share.js'));


//ADMIN SECTION
app.all('/admin/login', require('./admin/login.js'));
app.get('/admin', utils.checkIfAdmin, require ('./admin/home.js'));
app.all('/admin/*', utils.checkIfAdmin);
app.get('/admin/qrcode/:id', require('./qrcodeGen.js'));
app.get('/admin/logout', require ('./admin/logout.js'));
// remove section
app.get('/admin/items/remove/:type/:id', require ('./admin/remove.js'));
app.get('/admin/items/remove/c/:type/:id', require ('./admin/remove_c.js'));
app.get('/admin/authors/remove/:type/:id', require ('./admin/remove.js'));
app.get('/admin/sections/remove/:type/:id', require ('./admin/remove.js'));
app.get('/admin/exhibitions/remove/:type/:id', require ('./admin/remove.js'));
app.get('/admin/users/remove/:type/:id', require ('./admin/remove.js'));
app.get('/admin/admin_users/remove/:type/:id', require ('./admin/remove.js'));
// add section
app.post('/admin/add_menu/exhibition_add', require ("./admin/ex_add_c.js"));
app.post('/admin/add_menu/author_add', require ("./admin/author_add_c.js"));
app.post('/admin/add_menu/section_add', require ("./admin/section_add_c.js"));
app.post('/admin/add_menu/item_add', require ("./admin/item_add_c.js"));
app.post('/admin/add_menu/admin_user_add', require("./admin/admin_user_add_c.js"));

//update section
app.post('/admin/section_info/upd/:id', require ("./admin/section_upd.js"));
app.post('/admin/author_info/upd/:id', require ("./admin/author_upd.js"));
app.post('/admin/ex_info/upd/:id',require ('./admin/ex_upd.js'));
app.post('/admin/item_info', require('./admin/item_upd.js'));

// get section
app.get('/admin/items', require ('./admin/items.js'));
app.get('/admin/exhibitions', require('./admin/exhibitions.js'));
app.get('/admin/exhibitions/:id', require('./admin/ex_info.js'));
app.get('/admin/items/:filter/:id', require ('./admin/items.js'));
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
app.get('/admin/admin_users', require ('./admin/admin_users.js'));
app.get('/admin/add_menu/admin_user_add', require ('./admin/admin_user_add.js'));

//MOBILEAPI
app.post('/mobileapi/login', require('./mobileapi/login.js'));
app.post('/mobileapi/addobject', require('./mobileapi/addobject.js'));
app.post('/mobileapi/register', require('./mobileapi/register.js'));
app.post('/mobileapi/addphoto', require('./mobileapi/addphoto.js'));
app.post('/mobileapi/geturl', require('./mobileapi/geturl.js'));

//MOBILEVIEWS
app.get('/mobileviews/bookmarks', require('./mobileviews/bookmarks.js'));
app.get('/mobileviews/myphotos', require('./mobileviews/myphotos.js'));
app.get('/mobileviews/myphotos/:action/:id', require('./mobileviews/myphotos.js'));
app.get('/mobileviews/bookmarks/:id', require('./mobileviews/bookmark.js'));
app.get('/mobileviews/myphotos/:id', require('./mobileviews/personalphoto.js'));

//PHOTOBOOK SHARING
app.get('/booklet/:hash/photos/:offset?', require('./booklet/photos.js'));
app.get('/booklet/:hash/:offset?', require('./booklet/booklet.js'));
app.get('/booklet/:hash/photo/:id', require('./booklet/userphoto.js'));

app.listen(process.env.PORT || 8288);
