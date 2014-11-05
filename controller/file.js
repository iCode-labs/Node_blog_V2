module.exports = function(config, render, parse) {
	var fs = require('fs');
	return {
		getimage: function * (next) {
			var path = "./public/upload/images/" + this.params.hash + "/" + this.params.name;
			this.body = fs.createReadStream(path);
		},
		uploadpic: function * (next) {

			if ('POST' != this.method)
				return yield next;

			var parts = mutiparse(this);
			var part;
			while (part = yield parts) {
				var paths = part.filename.split("-");
				var imgdir = "./public/upload/images/" + paths[0];
				if (fs.existsSync(imgdir)) {
					console.log('img directory exist');
				} else {
					fs.mkdirSync(imgdir);
					console.log('create img directory success');
				}
				var stream = fs.createWriteStream("./public/upload/images/" + paths[0] + "/" + paths[1]);
				part.pipe(stream);
				console.log('uploading %s -> %s', part.filename, stream.path);
			}
			this.body = {
				isSuccess: true
			};
		}
	}
}