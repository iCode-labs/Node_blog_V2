module.exports=function(root,mainpath){
global.Config={};
global.Request={};
var koa=require('koa'),
	staticCache=require('koa-static-cache'),
	swig=require('swig'),
	app=koa(),
	path=require('path'),
	fs=require('fs'),
	logger=require('koa-logger'),
	co=require('co'),
	parse=require('co-body'),
	views=require('co-views'),
	mongoose=require('mongoose'),
	underscore=require('underscore'),
	session=require('koa-session');

	var userconfig=require(root+'/config')(root);
	Config=userconfig;

	var render=views(Config.view,{
		map:{
			html:'swig'
		}
	});

	app.use(staticCache(path.join(root,'public'),{
		maxAge:365*24*60*60
	}));
	app.use(session());
	app.keys=[Config.secret];
	//路由分发
	app.use(function*(next){
		Request.method=this.request.method;
		Request.url=this.request.url.split('?')[0];
		Request.url=this.request.url.split('/');
		Request.module=Request.url[1];
		Request.controller=Request.url[2];
		Request.action=Request.url[3];

		if(Request.module=="")
			yield require(Config.controller+'base.js')(this,render,parse)['index']();
		else {
			var handler=require(Config.controller+Request.module+'/'+Request.controller)(this,render,parse);
			if(underscore.isFunction(handler[Request.action]))
				yield handler[Request.action]();
			else
				yield next;
		}
	});

	app.listen(Config.port);
	console.log('server listening on port:'+Config.port);
	app.on('error',function(err){
		console.log('server error',err);
	});
}