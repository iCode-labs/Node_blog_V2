var path = require('path');
var Server = require(path.join(__dirname, 'server/server.js'));
var config = require('./config.js')(__dirname);
var server = new Server(config);

process.env.TZ = "asia/beijing";
server.start();
server.connectDb();
server.errHandle(function(err) {
    console.log("Error :" + err);
});
