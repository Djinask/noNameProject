module.exports = function (req,res) {
	res.clearCookie('user');
	res.clearCookie('hash');
	res.redirect('/photobook/login');
};