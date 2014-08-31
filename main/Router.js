module.exports = function(config) {
	var koa = require('koa'),
		app = koa(),
		router = require('koa-router'),
		views = require('co-views'),
		fs = require('fs'),
		parse = require('co-body'),
		Router = new router();
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

	require('./common/dataSeed.js')(config);
	Router.redirect('/home', '/');
	Router.get('/', index.index);
	Router.get('/login', auth.login);
	Router.get('/register', auth.register);
	Router.post('/login', auth.onlogin);
	Router.get('/logout', auth.logout);
	Router.get('/create', blog.create);
	Router.post('/create', blog.oncreate);
	app.use(Router.middleware());
	app.use(common.notFound);
	return app;
}