module.exports = function (req,res) {
	res.clearCookie('user');
	res.redirect('/photobook/login');
};