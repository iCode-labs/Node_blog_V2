module.exports = function(config) {
	var koa = require('koa'),
		app = koa(),
		router = require('koa-router'),
		views = require('co-views'),
		fs = require('fs'),
		parse = require('co-body'),
		router = new router();
	//渲染模板函数
	var render = views(config.view, {
		default: 'jade'
	});
	//加载model
	fs.readdirSync(config.model).forEach(function(file) {
		if (~file.indexOf('.js'))
			require(config.model + '/' + file)(config);
	});
	//加载controller
	var index = require(config.controller + '/index.js')(config, render, parse),
		auth = require(config.controller + '/auth.js')(config, render, parse),
		common = require(config.controller + '/common.js')(config, render, parse),
		blog = require(config.controller + '/blog.js')(config, render, parse);
	//初始化数据库
	require('./common/dataSeed.js')(config);
	//配置路由监听
	router.redirect('/home', '/newblogs');
	router.redirect('/', '/newblogs');
	router.get('/login', auth.login);
	router.get('/register', auth.register);
	router.post('/login', auth.onlogin);
	router.get('/logout', auth.logout);
	router.get('/create', blog.create);
	router.post('/create', blog.oncreate);
	router.get('/newblogs', blog.getnews);
	router.get('/blog/:id', blog.getblog);
	app.use(router.middleware());
	app.use(common.notFound);
	return app;
}