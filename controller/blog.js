'use strict';

var Blog = Database.models.blog;
var _ = require('underscore');
var marked = require('marked');
var fs = require('fs');
var os = require('os');
var path = require('path');
var dateFormat = require('dateformat');
var views = require('co-views');
var parse = require("co-body");
var render = views(Conf.view, {
    default: 'jade'
});

var ctrl = {};

exports = module.exports = ctrl;

ctrl.getnews = function*(next) {

    var blogs = yield Blog.getLatestPosts();
    var bloglist = [];

    blogs.forEach(function(item) {
        var blog = {
            blogId: item._id,
            blog_title: item.blog_title,
            author_name: item.author,
            blog_tags: item.tags,
            browse_times: item.visits,
            update_time: (new Date(item.update_time - 4 * 3600 * 1000)).toISOString().split('.')[0]
        };
        bloglist.push(blog);
    });
    this.body = yield render('index', {
            config: Conf.template,
            title: '最新文章',
            articles: bloglist,
            tags: this.session.tags || [],
            archives: this.session.archives || []
        });

};

ctrl.getblog = function*(next) {
    var blog = yield Blog.getBlogById(this.params.id);
    blog.visits++;
    blog.save();
    var resblog = {
        blogId: blog._id,
        blog_title: blog.blog_title,
        blog_content: marked(blog.blog_content),
        update_time: (new Date(blog.update_time - 4 * 3600 * 1000)).toISOString().split('.')[0],
        author_name: blog.author,
        blog_tags: blog.tags,
        browse_times: blog.visits
    };
    if (!_.isNull(blog)) {
        this.body = yield render("/blog/article", {
                config: Conf.template,
                title: resblog.blog_title,
                blog: resblog,
                disqus: Conf.disqus_shortname
            });
    }

};

ctrl.getblogbycategory = function*(next) {
    var blogs = yield Blog.getCategoryPosts(this.params.category);
    var bloglist = [];
    blogs.forEach(function(item) {
        var blog = {
            blogId: item._id,
            blog_title: item.blog_title,
            update_time: (new Date(item.update_time - 4 * 3600 * 1000)).toISOString().split('.')[0],
            author_name: item.author,
            blog_tags: item.tags,
            browse_times: item.visits
        };
        bloglist.push(blog);
    });
    this.body = yield render('/index', {
            config: Conf.template,
            title: this.params.category,
            articles: bloglist,
            tags: this.session.tags,
            archives: this.session.archives
        });

};

ctrl.getblogbytag = function*(next) {
    var blogs = yield Blog.getBlogsByTag(this.params.tag);
    var bloglist = [];
    blogs.forEach(function(item) {
        var blog = {
            blogId: item._id,
            blog_title: item.blog_title,
            update_time: (new Date(item.update_time - 4 * 3600 * 1000)).toISOString().split('.')[0],
            author: item.author,
            tags: item.tags,
            browse_times: item.browse_times
        };
        bloglist.push(blog);
    });
    this.body = yield render('/index', {
            config: Conf.template,
            title: this.params.category,
            articles: bloglist,
            tags: this.session.tags,
            archives: this.session.archives
        });

};
