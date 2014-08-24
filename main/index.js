module.exports=function(root,mainpath){
global.Config={};
global.Request={};
global.Functions={};
global.Session={};
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
	
	//加载配置文件
	var userconfig=require(root+'/config')(root);
	Config=userconfig;

	var render=views(Config.view,{
		map:{
			html:'swig'
		}
	});
	//加载公共函数
	var common=require(mainpath+'/common/loader')(mainpath);
	Functions=underscore.extend(underscore,common);

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
		Session=this.session;
		if(""==Request.module)
			yield require(Config.controller+'base.js')(this,render,parse)['index']();
		else {
			try{
				var handler=require(Config.controller+Request.module+'/'+Request.controller+'.js')(this,render,parse);
				if(underscore.isFunction(handler[Request.action]))
					yield handler[Request.action]();
				else
					yield next;
			}catch(e){
				console.log(e);
				yield next;
			}
			
		}
	});
	//404
	app.use(function*pageNotFound(next){
		console.log(this.query);
		var ref = this.session.currentUrl || '/';
		this.body=yield render('common/msg.jade',{
			session:this.session,
			config:Config.template,
			title:'请求错误',
			second:3,
			msg:'找不到请求的页面。',
			url:ref
		});
	});
	app.listen(Config.port);
	console.log('server listening on port:'+Config.port);
	app.on('error',function(err){
		console.log('server error',err);
	});
}