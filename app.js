var path = require('path');
var Server = require(path.join(__dirname, 'server/server.js'));
var config = require('./config.js')(__dirname);
var server = new Server(config);
var log=require('util').log;

server.start();
server.connectDb();
server.initCache();
server.errHandle(function(err) {
    log("Error :" + err);
});
