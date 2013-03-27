var copyInto = function(originPath, newName) {
    var path = require('path');
    var img = path.basename(originPath,'.jpg');
    img = newName + '.jpg';
    
    var fs = require('fs');
    var readStream = fs.createReadStream(originPath);
    readStream.pipe(fs.createWriteStream('../public_html/photos/' + img));
};