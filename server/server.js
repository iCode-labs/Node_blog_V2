	var koa = require('koa'),
	    staticCache = require('koa-static-cache'),
	    path = require('path'),
	    mongoose = require('mongoose'),
	    logger = require('koa-logger'),
	    session = require('koa-session'),
	    favicon = require('koa-favicon'),
	    mount = require('koa-mount');
	var log = require('util').log;
	var cached = require('./cached_redis.js');
	var routes = require('./routes.js');
	var _ = require('underscore');
	var R = require('koa-router');
	var util = require('util');
    var debug=require('debug')('blog:server');


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
	    if (this.opts.log)
	        this.use(logger());
	    this.loadMiddleWare();
	    this.initRoutes();

	    this.listen(port);
	    debug("Server listening on " + port);
	}

	Server.prototype.connectDb = function() {
	    var conf = {
	        server: {
	            poolSize: 12,
	            socketOptions: {
	                keepAlive: 1
	            }
	        }
	    };
	    mongoose.connect(this.opts.mongodb, conf);
	    mongoose.connection.on('connected', function() {
	        debug('mongoose connected');
	    });
	    mongoose.connection.on('error', function(err) {
	        debug('mongoose default connection error: ' + err);
	    });
	    mongoose.connection.on('disconnected', function() {
	        debug('mongoose default connection disconnected');
	    });
	    process.on('SIGINT', function() {
	        mongoose.connection.close(function() {
	            debug('mongoose default connection disconnected through app termination');
	            process.exit(0);
	        });
	    });
	}

	Server.prototype.config = function() {}

	Server.prototype.initCache = function() {
	    cached(mongoose);
	    debug("Mongoose cache enabled");
	}

	Server.prototype.initGlobal = function() {
	    global.Conf = this.opts;
	    global._log = log;
	    global.Database = require('./modelloader.js');

	    debug("initlizing global");
	}

	Server.prototype.initRoutes = function() {
	    var ctrls = require('./ctrlloader.js');
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
	        this.session.tags =
	            yield initMw.inittags();
	        this.session.archives =
	            yield initMw.initArchives();
	        yield next;
	    });
	}

	Server.prototype.errHandle = function(callback) {
	    process.on('uncaughtException', callback);
	}

	exports = module.exports = Server;
