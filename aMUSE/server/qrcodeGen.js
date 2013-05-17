var QRcode = require('qrpng');
	
module.exports = function(req, res) {

	var id = req.params.id;
	QRcode(id, 10, function(error, png){
		if(error) {
			console.log(error);
			res.send('qr error');
		} else {
			res.send(png, {
				'Content-Type': 'image/png'
			}, 200);
		}		
	});
};