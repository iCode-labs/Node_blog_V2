module.exports=function(root,mainpath){
var koa=require('koa'),
	staticCache=require('koa-static-cache'),
	app=koa(),
	co=require('co'),
	path=require('path'),
	parse = require('co-body'),
	mongoose=require('mongoose'),
	underscore=require('underscore'),
	logger=require('koa-logger'),
	session=require('koa-session'),
	router=require('koa-router'),
	mount = require('koa-mount'),
	userconfig=require(root+'/config')(root),
	configRouter=require('./Router.js')(userconfig);
	//设置静态文件路径
	app.use(staticCache(path.join(root,'public'),{
		maxAge:365*24*60*60
	}));
	app.use(session());
	app.keys=[userconfig.secret];
	//路由分发
	app.use(mount(configRouter));
	//监听端口
	app.listen(userconfig.port);
	console.log('server listening on port:'+userconfig.port);
	app.on('error',function(err){
		console.log('server error',err);
	});
}