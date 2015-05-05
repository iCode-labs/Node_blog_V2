'use strict';

var ctrl={};
exports = module.exports = ctrl;

var User = Database.models.user;
var views = require('co-views');
var parse = require("co-body");
var render = views(Conf.view, {
    default: 'jade'
});

ctrl.index = function*(next) {
    this.body =
        yield render('admin/index.jade');
};
ctrl.auth = function*(next) {
    var data =
        yield parse(this);
    var users =
        yield User.getAccounts();
    for (var idx in users) {
        if (users[idx].email == data.email && users[idx].password == data.password) {
            this.body = {
                isSuccess: true
            };
            return;
        }
    }
    this.body = {
        isSuccess: false
    };
};
