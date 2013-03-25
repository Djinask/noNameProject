var express = require('express');
var app = express();
var accountCreation = require('./account.js').app;


app.get('/', function(req, res) {
	res.send(200, 'ciao');
});

app.get('/object/:id', function(req, res) {
	res.send(200, "BuBu: " + req.params.id);
});
app.get('/signup/:email', accountCreation);

app.listen(1234);