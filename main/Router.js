module.exports=function(config){
	var koa=require('koa'),
		app=koa(),
		router=require('koa-router'),
		views=require('co-views'),
		newRouter=new router();
	//渲染模板函数
	var render=views(config.view,{
		default: 'jade'
	});
	newRouter.get('/',function*(){
		this.body=yield render('index',{
			config:config.template,
			title:'首页',
			pageData:{is_login:false}
		});
	});
	app.use(newRouter.middleware());
	return app;
}	

