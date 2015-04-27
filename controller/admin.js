'use strict';

exports = module.exports = ctrl;

var log = require('util').log;
var mongoose = require('mongoose');
var User = mongoose.model('User');

function ctrl(conf, parse) {
    var views = require('co-views');
    var render = views(conf.view, {
        default: 'jade'
    });
    var ctrls = {};
    ctrls.index = function*(next) {
        this.body =
            yield render('admin/index.jade');
    };
    ctrls.auth = function*(next) {
        var data =
            yield parse(this);

        var users =
            yield User.getAccounts();
        for(var idx in users){
            if(users[idx].email==data.email&&users[idx].password==data.password){
                this.body={
                    isSuccess:true
                };
                return;
            }
        }
        this.body={
            isSuccess:false
        };

    };

    return ctrls;
};
