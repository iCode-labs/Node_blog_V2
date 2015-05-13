var file = {};
exports = module.exports = file;

var fs = require('fs');
var Blog = Database.models.blog;
var multparse = require('co-busboy');

file.backup = function*(next) {
    var blogs =
        yield Blog.getBlogs();
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
    /* var part;*/
    //while (part =
    //yield parts) {
    //var paths = part.filename.split("-");
    //var imgdir = path.join("./public/upload/images/", paths[0]);
    //if (fs.existsSync(imgdir)) {
    //console.log('img directory exist');
    //} else {
    //fs.mkdirSync(imgdir);
    //console.log('create img directory success');
    //}
    //var stream = fs.createWriteStream(path.join(config.root, 'public/upload/images/', paths[0], paths[1]));
    //part.pipe(stream);
    //console.log('uploading %s -> %s', part.filename, stream.path);
    /*}*/
    this.body = {
        isSuccess: true
    };

};
//module.exports = function(config, render, parse) {
//var fs = require('fs'),
//path = require('path'),
//mutiparse = require('co-busboy');
//return {
//getimage: function * (next) {
//var pipe = path.join(config.root, "/public/upload/images/", this.params.hash, this.params.name);
//this.body = fs.createReadStream(pipe);
//},
//uploadpic: function * (next) {
//if ('POST' != this.method)
//return yield next;
//var parts = mutiparse(this);
//var part;
//while (part = yield parts) {
//var paths = part.filename.split("-");
//var imgdir = path.join("./public/upload/images/", paths[0]);
//if (fs.existsSync(imgdir)) {
//console.log('img directory exist');
//} else {
//fs.mkdirSync(imgdir);
//console.log('create img directory success');
//}
//var stream = fs.createWriteStream(path.join(config.root, 'public/upload/images/', paths[0], paths[1]));
//part.pipe(stream);
//console.log('uploading %s -> %s', part.filename, stream.path);
//}
//this.body = {
//isSuccess: true
//};
//}
//}
//}
