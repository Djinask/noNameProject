module.exports = function (req, res) {
	req.checkIfLogged(res, function(user) {
		res.render('photobook/home.html', {email: user.email});
	});
};