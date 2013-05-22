module.exports = function(req,res){
	res.clearCookie('admin');
	res.redirect('/admin/login');
}