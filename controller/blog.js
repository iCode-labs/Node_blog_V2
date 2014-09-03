module.exports = function(config, render, parse) {
	var mongoose = require('mongoose'),
		Blog = mongoose.model('Blog'),
		base64 = require(config.mainpath + 'common/base64.js'),
		underscore = require('underscore'),
		marked = require('marked'),
		moment = require('moment'),
		ObjectId = mongoose.ObjectId;
	var showMsg = require(config.mainpath + '/common/showMsg.js');

	var longth = function(epoch) {
		var diff = Date.now() - parseInt(epoch, 10);
		return moment.duration(diff).humanize() + ' ago';
	};
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
			if (underscore.isNull(this.session.user)) {
				var params = {
					title: '提示',
					msg: '请先登录',
					url: '/login',
					second: 2
				};
				this.body = yield showMsg(params, this.session, config, render);
			} else {
				var blog = new Blog();
				blog.blog_title = blogdata.blogtitle;
				blog.blog_content = blogdata.blogcontent;
				blog.is_active = true;
				blog.author_id = this.session.user._id;
				blog.author_name = this.session.user.user_name;
				blog.save();
				this.body = {
					isSuccess: true
				};
			}
		},
		getnews: function * (next) {
			var blogs = yield Blog.getLatestPosts();
			var bloglist = new Array();
			blogs.forEach(function(item) {
				var blog = {
					blogId: item._id,
					blog_title: item.blog_title,
					blog_longth: longth(item.date_created.getTime()),
					author_name: item.author_name,
					blog_tags: item.blog_tags
				};
				bloglist.push(blog);
			});
			console.log(bloglist);
			this.body = yield render('index', {
				config: config.template,
				title: '最新文章',
				pageData: this.session,
				articles: bloglist
			});
		},
		getblog: function * (next) {
			var blog = yield Blog.findOne({
				"_id": this.params.id
			}).exec();
			var resblog = {
				blogId: blog._id,
				blog_title: blog.blog_title,
				blog_longth: longth(blog.date_created.getTime()),
				author_name: blog.author_name,
				blog_content: blog.blog_content,
				blog_tags: blog.blog_tags
			};
			if (!underscore.isNull(blog)) {
				this.body = yield render("/blog/article", {
					config: config.template,
					title: resblog.blog_title,
					blog: resblog,
					pageData: this.session
				});
			}
		}
	}
}