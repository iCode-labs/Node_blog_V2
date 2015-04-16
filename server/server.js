	var koa = require('koa'),
	    staticCache = require('koa-static-cache'),
	    path = require('path'),
	    mongoose = require('mongoose'),
	    logger = require('koa-logger'),
	    session = require('koa-session'),
	    favicon = require('koa-favicon'),
	    mount = require('koa-mount');
	var log = require('util').log;
	var cached = require('./cached.js');

	function Server(option) {
	    this.opts = option || {};
	}

	 // Inherit form 'koa'
	Server.prototype = koa();

	Server.prototype.start = function() {
	    var port = this.opts.port || 8000;
	    var router = require('./router.js')(this.opts);

	    this.use(session(null, this));
	    this.use(favicon(path.join(__dirname, "public/image/favicon.ico")));
	    this.keys = [this.opts.secret] || "secret key string";
	    this.use(staticCache(path.join(this.opts.root, 'public'), {
	        maxAge: 365 * 24 * 60 * 60
	    }));
	    if (this.opts.log)
	        this.use(logger());
	    this.use(mount(router));
	    this.listen(port);
	    log("Server listen on "+port);
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
	    // mongoose connected 
	    mongoose.connection.on('connected', function() {
	        log('mongoose connected');
	    });
	    // If the connection throws an error
	    mongoose.connection.on('error', function(err) {
	        log('mongoose default connection error: ' + err);
	    });

	    // When the connection is disconnected
	    mongoose.connection.on('disconnected', function() {
	        log('mongoose default connection disconnected');
	    });

	    // If the Node process ends, close the Mongoose connection
	    process.on('SIGINT', function() {
	        mongoose.connection.close(function() {
	            log('mongoose default connection disconnected through app termination');
	            process.exit(0);
	        });
	    });
	}

	Server.prototype.config = function() {

	}

	Server.prototype.initCache = function() {
	    cached(mongoose);
	}

	Server.prototype.errHandle = function(callback) {
	    process.on('uncaughtException',callback);
	}

	exports = module.exports = Server;
