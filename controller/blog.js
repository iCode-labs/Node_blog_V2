module.exports = function(config, render, parse) {
	var mongoose = require('mongoose'),
		Blog = mongoose.model('Blog'),
		_ = require('underscore'),
		marked = require('marked'),
		mutiparse = require('co-busboy'),
		parse = require('co-body'),
		fs = require('fs'),
		os = require('os'),
		path = require('path'),
		moment = require('moment');
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
			if (_.isNull(this.session.user)) {
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
				blog.blog_category = blogdata.blogcategory;
				blog.save();
				this.body = {
					isSuccess: true
				};
			}
		},
		pushblog: function * (next) {
			var blogdata = yield parse(this);
			console.log(blogdata);
			if (blogdata.token == config.pushtoken) {
				var blog = new Blog();
				blog.blog_title = blogdata.blog_title;
				blog.blog_content = blogdata.blog_content;
				blog.blog_snap = blogdata.blog_snap;
				blog.author_name = blogdata.user_name;
				blog.blog_category = blogdata.blog_category;
				blog.blog_tags = blogdata.blog_tags;
				blog.post_date = moment().format('MMMM Do YYYY, h:mm:ss a');
				blog.save();
				this.body = {
					isSuccess: true
				};
			}
		},
		updateblog: function * (next) {
			var blogdata = yield parse(this);
			if (blogdata.token == config.pushtoken) {
				var blog = yield Blog.findOne({
					"blog_title": blogdata.blog_title
				}).exec();
				if (!_.isNull(blog)) {
					blog.blog_content = blogdata.blog_content || "";
					blog.blog_snap = blogdata.blog_snap || "";
					blog.save();
					this.body = {
						isSuccess: true
					}
				}
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
					blog_snap: item.blog_snap,
					author_name: item.author_name,
					blog_tags: item.blog_tags,
					browse_times: item.browse_times
				};
				bloglist.push(blog);
			});
			this.body = yield render('index', {
				config: config.template,
				title: '最新文章',
				pageData: this.session,
				articles: bloglist,
				tags: this.session.tags
			});
		},
		getblog: function * (next) {
			var blog = yield Blog.findOne({
				"_id": this.params.id
			}).exec();
			blog.browse_times++;
			blog.save();
			console.log(blog);
			var resblog = {
				blogId: blog._id,
				blog_title: blog.blog_title,
				blog_longth: longth(blog.date_created.getTime()),
				author_name: blog.author_name,
				blog_content: marked(blog.blog_content),
				blog_tags: blog.blog_tags,
				blog_browse: blog.browse_times
			};
			if (!_.isNull(blog)) {
				this.body = yield render("/blog/article", {
					config: config.template,
					title: resblog.blog_title,
					blog: resblog,
					pageData: this.session,
					disqus: config.disqus_shortname
				});
			}
		},
		getblogbycategory: function * (next) {
			var blogs = yield Blog.getCategoryPosts(this.params.category);
			var bloglist = new Array();
			blogs.forEach(function(item) {
				var blog = {
					blogId: item._id,
					blog_title: item.blog_title,
					blog_longth: longth(item.date_created.getTime()),
					blog_snap: item.blog_snap,
					author_name: item.author_name,
					blog_tags: item.blog_tags,
					browse_times: item.browse_times,
					comment_times: item.comment_times
				};
				bloglist.push(blog);
			});
			this.body = yield render('/index', {
				config: config.template,
				title: this.params.category,
				pageData: this.session,
				articles: bloglist,
				tags: this.session.tags
			});
		},
		getblogbytag: function * (next) {
			var blogs = yield Blog.getBlogsByTag(this.params.tag);
			var bloglist = new Array();
			blogs.forEach(function(item) {
				var blog = {
					blogId: item._id,
					blog_title: item.blog_title,
					blog_longth: longth(item.date_created.getTime()),
					blog_snap: item.blog_snap,
					author_name: item.author_name,
					blog_tags: item.blog_tags,
					browse_times: item.browse_times,
					comment_times: item.comment_times
				};
				bloglist.push(blog);
			});
			this.body = yield render('/index', {
				config: config.template,
				title: this.params.category,
				pageData: this.session,
				articles: bloglist,
				tags: this.session.tags
			});
		}

	}
}