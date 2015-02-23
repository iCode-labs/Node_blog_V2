module.exports = function(conf) {
	var koa = require('koa'),
		app = koa(),
		router = require('koa-router'),
		views = require('co-views'),
		fs = require('fs'),
		parse = require('co-body'),
		router = new router();
	//渲染模板函数
	var render = views(conf.view, {
		default: 'jade'
	});
	//加载model
	fs.readdirSync(conf.model).forEach(function(file) {
		if (~file.indexOf('.js'))
			require(conf.model + '/' + file)(conf);
	});
	//load controller
	var index = require(conf.controller + '/index.js')(conf, render, parse),
		auth = require(conf.controller + '/auth.js')(conf, render, parse),
		common = require(conf.controller + '/common.js')(conf, render, parse),
		blog = require(conf.controller + '/blog.js')(conf, render, parse),
		file = require(conf.controller + '/file.js')(conf, render, parse);
	//初始化middleware
	app.use(function*(next) {
		var init = require(conf.mainpath + '/common/init.js')(conf);
		this.session.tags =
			yield init.inittags();
		yield next;
	});
	//配置监听函数
	router.redirect('/', '/newblogs');
	router.get('/login', auth.login);
	router.get('/register', auth.register);
	router.post('/login', auth.onlogin);
	router.get('/logout', auth.logout);
	router.get('/create', blog.create);
	router.post('/create', blog.oncreate);
	router.get('/newblogs', blog.getnews);
	router.get('/blog/:id', blog.getblog);
	router.get('/category/:category', blog.getblogbycategory);
	router.get('/tag/:tag', blog.getblogbytag);
	router.post('/uploadpic', file.uploadpic);
	router.get('/getimage/:hash/:name', file.getimage);
	//blog open API
	router.post('/pushblog', blog.pushblog);
	router.post('/updateblog', blog.updateblog);
	//load router
	app.use(router.middleware());
	app.use(common.notFound);
	return app;
}