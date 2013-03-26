var express = require('express');
var swig = require('swig');
var consolidate = require('consolidate');
var app = express();

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

app.get('/object/:id', function(req, res) {
    res.send(200, "BuBu: " + req.params.id);
});
app.get('/signup/:email', require('./account.js').app);
var home = require('./data.js').app;
app.get('/:selection', home);
app.get('/', home);

app.listen(8585);
