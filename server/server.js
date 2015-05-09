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
	    this.initRoutes();
        this.loadMiddleWare();
	    this.listen(port);
	    log("Server listening on " + port);
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
	        log('mongoose connected');
	    });
	    mongoose.connection.on('error', function(err) {
	        log('mongoose default connection error: ' + err);
	    });
	    mongoose.connection.on('disconnected', function() {
	        log('mongoose default connection disconnected');
	    });
	    process.on('SIGINT', function() {
	        mongoose.connection.close(function() {
	            log('mongoose default connection disconnected through app termination');
	            process.exit(0);
	        });
	    });
	}

	Server.prototype.config = function() {}

	Server.prototype.initCache = function() {
	    cached(mongoose);
	    log("Mongoose cache enabled");
	}

	Server.prototype.initGlobal = function() {
	    global.StdLog = log;
	    global.Conf = this.opts;
	    global.Database = require('./modelloader.js');
	    global._log = log;
	    log("initlizing global");
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
	    this.use(function*(next) {
	        var init = require('./initMw.js')(Conf);
	        this.session.tags =
	            yield init.inittags();
	        this.session.archives =
	            yield init.initArchives();
	        yield next;
	    });
	}

	Server.prototype.errHandle = function(callback) {
	    process.on('uncaughtException', callback);
	}

	exports = module.exports = Server;
