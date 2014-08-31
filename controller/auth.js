module.exports = function(config, render, parse) {
	var mongoose = require('mongoose'),
		User = mongoose.model('User');
	var showMsg = require(config.mainpath + '/common/showMsg.js');

	return {
		login: function * (next) {
			this.body = yield render('auth/login', {
				config: config.template,
				title: '用户登录',
				pageData: this.session
			});
		},
		register: function * (next) {
			this.body = yield render('auth/register', {
				config: config.template,
				title: '用户注册',
				pageData: this.session
			});
		},
		onlogin: function * (next) {
			var pageData = yield parse(this);
			var account = pageData.account;
			var password = pageData.password;
			var user = yield User.findOne({
				'user_email': account
			}).exec();
			if (!Functions.isNull(user)) {
				if (password == user.password) {
					this.session.is_login = true;
					this.session.user = user;
					var params = {
						title: '登录成功',
						msg: '欢迎回来' + user.user_name,
						url: '/',
						second: 4
					};
					this.body = yield showMsg(params, this.session, config, render);
				} else {
					var params = {
						title: '登录失败',
						msg: '密码错误',
						url: '/login',
						second: 4
					};
					this.body = yield showMsg(params, this.session, config, render);
				}

			} else {
				var params = {
					title: '登录失败',
					msg: '没有该用户',
					url: '/login',
					second: 4
				};
				this.body = yield showMsg(params, this.session, config, render);
			}

		},
		logout: function * (next) {
			this.session = null;
			this.redirect('/');
		}

	}
}