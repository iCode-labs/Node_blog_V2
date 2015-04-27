var path = require('path');
var Server = require(path.join(__dirname, 'server/server.js'));
var config = require('./config.js')(__dirname);
var server = new Server(config);

server.start();
server.connectDb();
server.initCache();
server.initGlobal();
server.errHandle(function(err) {
    log("Error :" + err);
});
