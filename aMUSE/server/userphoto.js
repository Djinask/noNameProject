module.exports = function(req, res) {
	req.checkIfLogged(res, function() {
		res.sendfile(req.params.name, {
			root: '../userphotos/'
		});
	})
};