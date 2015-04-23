'use strict';

module.exports = function(config, render, parse) {
    var mongoose = require('mongoose');
    var Blog = mongoose.model('Blog');
    var _ = require('underscore');
    var marked = require('marked');
    var fs = require('fs');
    var os = require('os');
    var path = require('path');
    var dateFormat = require('dateformat');

    return {
        pushblog: function*(next) {
            var blogdata =
                yield parse(this);
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
        updateblog: function*(next) {
            var blogdata =
                yield parse(this);
            if (blogdata.token == config.pushtoken) {
                var blog =
                    yield Blog.findOne({
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
        getnews: function*(next) {
            var blogs =
                yield Blog.getLatestPosts();
            var bloglist = [];
            blogs.forEach(function(item) {
                var blog = {
                    blogId: item._id,
                    blog_title: item.blog_title,
                    update_time: dateFormat(item.create_time.getTime(), "yyyy-mm-dd hh:MM:ss"),
                    author_name: item.author,
                    blog_tags: item.tags,
                    browse_times: item.visits
                };
                bloglist.push(blog);
            });
            this.body =
                yield render('index', {
                    config: config.template,
                    title: '最新文章',
                    articles: bloglist,
                    tags: this.session.tags,
                    archives: this.session.archives
                });
        },
        getblog: function*(next) {
            var blog =
                yield Blog.findOne({
                    "_id": this.params.id
                }).exec();
            blog.visits++;
            blog.save();
            var resblog = {
                blogId: blog._id,
                blog_title: blog.blog_title,
                blog_content: marked(blog.blog_content),
                update_time: dateFormat(blog.update_time.getTime(), "yyyy-mm-dd hh:MM:ss"),
                author_name: blog.author,
                blog_tags: blog.tags,
                browse_times: blog.visits
            };
            if (!_.isNull(blog)) {
                this.body =
                    yield render("/blog/article", {
                        config: config.template,
                        title: resblog.blog_title,
                        blog: resblog,
                        disqus: config.disqus_shortname
                    });
            }
        },
        getblogbycategory: function*(next) {
            var blogs =
                yield Blog.getCategoryPosts(this.params.category);
            var bloglist = new Array();
            blogs.forEach(function(item) {
                var blog = {
                    blogId: item._id,
                    blog_title: item.blog_title,
                    update_time: dateFormat(item.update_time.getTime(), "yyyy-mm-dd hh:MM:ss"),
                    author_name: item.author,
                    blog_tags: item.tags,
                    browse_times: item.visits
                };
                bloglist.push(blog);
            });
            this.body =
                yield render('/index', {
                    config: config.template,
                    title: this.params.category,
                    articles: bloglist,
                    tags: this.session.tags,
                    archives: this.session.archives
                });
        },
        getblogbytag: function*(next) {
            var blogs =
                yield Blog.getBlogsByTag(this.params.tag);
            var bloglist = [];
            blogs.forEach(function(item) {
                var blog = {
                    blogId: item._id,
                    blog_title: item.blog_title,
                    update_time: dateFormat(item.update_time.getTime(), "yyyy-mm-dd hh:MM:ss"),
                    author: item.author,
                    tags: item.tags,
                    browse_times: item.browse_times
                };
                bloglist.push(blog);
            });
            this.body =
                yield render('/index', {
                    config: config.template,
                    title: this.params.category,
                    articles: bloglist,
                    tags: this.session.tags,
                    archives: this.session.archives
                });
        }
    }
}
