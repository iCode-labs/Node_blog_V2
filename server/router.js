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
    //load controller
    var blog = require(conf.controller + '/blog.js');
    var admin = require(conf.controller + '/admin.js');
    var api = require(conf.controller + '/api.js');
    var statistics=require('./statistics.js');
    //初始化middleware
    app.use(function*(next) {
        var init = require(conf.mainpath + '/initMw.js')(conf);
        this.session.tags =
            yield init.inittags();
        this.session.archives =
            yield init.initArchives();
        yield next;
    });
    app.use(statistics());
    ////配置监听函数
    router.get('/', blog.getnews);
    router.get('/blog/:id', blog.getblog);
    router.get('/category/:category', blog.getblogbycategory);
    router.get('/tag/:tag', blog.getblogbytag);
    //admin
    router.get('/admin', admin.index);
    router.post('/api/authenticate', admin.auth);
    ////rest api
    router.get('/api/blogs', api.list);
    router.get('/api/blogs/:blogId', api.getBlog);
    router.post('/api/blogs', api.createBlog);
    router.put('/api/blogs', api.updateBlog);
    router.delete('/api/blogs/:blogId', api.deleteBlog);
    //load router
    app.use(router.middleware());
    return app;
}
