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
    //加载model
    fs.readdirSync(conf.model).forEach(function(file) {
        if (~file.indexOf('.js'))
            require(conf.model + '/' + file)(conf);
    });
    //load controller
    var index = require(conf.controller + '/index.js')(conf, render, parse);
    var blog = require(conf.controller + '/blog.js')(conf, render, parse);
    var file = require(conf.controller + '/file.js')(conf, render, parse);
    var admin = require(conf.controller + '/admin.js')(conf, parse);
    var api = require(conf.controller + '/api.js');
    var statistics=require('./statistics.js');
    //初始化middleware
    app.use(function*(next) {
        var init = require(conf.mainpath + '/common/init.js')(conf);
        this.session.tags =
            yield init.inittags();
        this.session.archives =
            yield init.initArchives();
        yield next;
    });
    app.use(statistics());
    //配置监听函数
    router.redirect('/', '/newblogs');
    router.get('/newblogs', blog.getnews);
    router.get('/blog/:id', blog.getblog);
    router.get('/category/:category', blog.getblogbycategory);
    router.get('/tag/:tag', blog.getblogbytag);
    router.post('/uploadpic', file.uploadpic);
    router.get('/getimage/:hash/:name', file.getimage);
    //blog open API
    router.post('/pushblog', blog.pushblog);
    router.post('/updateblog', blog.updateblog);
    //admin
    router.get('/admin', admin.index);
    router.post('/api/authenticate', admin.auth);
    //rest api
    router.get('/api/blogs', api.list);
    router.get('/api/blogs/:blogId', api.getBlog);
    router.post('/api/blogs', api.createBlog);
    router.put('/api/blogs', api.updateBlog);
    router.delete('/api/blogs/:blogId', api.deleteBlog);
    //load router
    app.use(router.middleware());
    return app;
}
