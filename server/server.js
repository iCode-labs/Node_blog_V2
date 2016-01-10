var koa = require('koa');
var staticCache = require('koa-static-cache');
var path = require('path');
var mongoose = require('mongoose');
var logger = require('koa-logger');
var session = require('koa-session');
var favicon = require('koa-favicon');
var mount = require('koa-mount');
var log = require('util').log;
var routes = require('./routes.js');
var _ = require('underscore');
var R = require('koa-router');
var util = require('util');
var debug = require('debug')('server');


function Server(option) {
  this.opts = option || {};
}

// Inherit form 'koa'
Server.prototype = koa();

Server.prototype.start = function() {
  var port = this.opts.port || 8000;
  this.use(session(null, this));
  this.use(favicon(path.join(__dirname, "../public/image/favicon.ico")));
  this.keys = [this.opts.secret] || "secret key string";
  this.use(staticCache(path.join(this.opts.root, 'public'), {
    maxAge: 365 * 24 * 60 * 60
  }));
  
  this.use(logger());
  this.loadMiddleWare();
  this.initRoutes();
  this.listen(port);
  
  debug("Server listening on " + port);
}

Server.prototype.connectDb = function() {
  mongoose.connect(this.opts.mongodb, {
    server: {
      poolSize: 12,
      socketOptions: {
        keepAlive: 1
      }
    }
  });
}

Server.prototype.config = function() {}

Server.prototype.initCache = function() {
  debug("Mongoose cache enabled");
}

Server.prototype.initGlobal = function() {
  global.Conf = this.opts;
  global._log = log;
  global.Database = require('./model_loader.js');
  debug("initlizing global");
}

Server.prototype.initRoutes = function() {
  var ctrls = require('./ctrl_loader.js');
  var router = new R();
  _.each(routes, function(route) {
    var handle = ctrls[route.ctrl][route.handle];
    router[route.method](route.url, handle);
  });
  this.use(router.middleware());
}

Server.prototype.loadMiddleWare = function() {
  var initMw = require('./initMw.js')();
  this.use(function*(next) {
    this.session.tags = yield initMw.inittags();
    this.session.archives = yield initMw.initArchives();
    yield next;
  });
}

Server.prototype.errHandle = function(callback) {
  process.on('uncaughtException', callback);
}

exports = module.exports = Server;
