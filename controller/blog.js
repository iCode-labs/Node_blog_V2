module.exports = function(config, render, parse) {
	var mongoose = require('mongoose'),
		Blog = mongoose.model('Blog'),
		base64 = require(config.mainpath + 'common/base64.js');
	var showMsg = require(config.mainpath + '/common/showMsg.js');
	return {
		create: function * (next) {
			this.body = yield render('blog/create', {
				config: config.template,
				title: '发表博客',
				pageData: this.session
			});
		},
		oncreate: function * (next) {
			var blogdata = yield parse(this);
			if (Functions.isNull(this.session.user)) {
				var params = {
					title: '提示',
					msg: '请先登录',
					url: '/login',
					second: 3
				};
				this.body = yield showMsg(params, this.session, config, render);
			} else {
				var blog = new Blog();
				blog.blog_title = blogdata.blogtitle;
				blog.blog_content = blogdata.blogcontent;
				blog.is_active = true;
				blog.author_id = '';
				blog.author_name = this.session.user.user_name;
				blog.save();
				this.body = {
					isSuccess: true
				};
			}
		}
	}
}