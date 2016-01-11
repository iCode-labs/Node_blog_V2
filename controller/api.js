'use strict';

var apis = {};

exports = module.exports = apis;

var Blog = Database.models.blog;
var dateFormat = require("dateformat");
var parse = require("co-body");

apis.list = function*(next) {
    this.body = yield Blog.getBlogs();
}

apis.getBlog = function*(next) {
    var blogId = this.params.blogId;
    this.body = yield Blog.getBlogById(blogId);
}

apis.createBlog = function*(next) {
    var data = yield parse(this);
    var blog = new Blog();
    blog.blog_content = data.blog_content;
    blog.blog_title = data.blog_title;
    blog.category = data.category;
    blog.tags = data.tagArray;
    blog.update_time = dateFormat((new Date()).getTime(), "yyyy-mm-dd hh:MM:ss");
    blog.create_time = blog.update_time;
    blog.status = "draft";
    blog.author = "rain";
    blog.save();
    this.body = {
        blog: blog
    };
}

apis.updateBlog = function*(next) {
    var data = yield parse(this);
    var origin = yield Blog.getBlogById(data._id);
    origin.blog_content = data.blog_content;
    origin.blog_title = data.blog_title;
    origin.category = data.category;
    origin.tags = data.tagArray;
    origin.update_time = dateFormat((new Date()).getTime(), "yyyy-mm-dd hh:MM:ss");
    origin.save();
    this.body = {
        blog: origin
    };
}

apis.deleteBlog = function*(next) {
    Blog.deleteById(this.params.blogId);
    this.body = {
        success: true
    };
}
