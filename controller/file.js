var file = {};
exports = module.exports = file;

var fs = require('fs');
var Blog = Database.models.blog;
var multparse = require('co-busboy');

file.backup = function*(next) {
    var blogs = yield Blog.getBlogs();
    var path = './public/backup/' + (new Date()).toLocaleString().split(' ')[0] + '.bak';
    fs.writeFile(path, blogs);
    this.redirect(path.substring(9, path.length));
}

file.uploadpic = function*(next) {
    if ('POST' != this.method)
        return yield next;
    var part = parse(this);
    var stream = fs.createWriteStream('../public/upload/s.png');
    part.pipe(stream);
    this.body = {
        isSuccess: true
    };
    this.body = {
        isSuccess: true
    };

};
