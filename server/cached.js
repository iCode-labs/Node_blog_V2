'use strict';

exports = module.exports = cache;
global.mongooseCache = {};

var log=require("util").log;

function cache(mongoose,conf) {
    var exec = mongoose.Query.prototype.exec;
    conf=conf||{expire:15*60*1000,log:true};
    var execCache = function() {
        var key = JSON.stringify({
            modelnName: this.model.modelName,
            contidions: this._conditions
        });
        for (var pro in mongooseCache) {
            if (pro === key) {
                var value = mongooseCache[key];
            }
        }
        if (value) {
            if((new Date).getTime()-value.expire>conf.expire)
                return exec.call(this,function(err,value){
                    if(conf.log){
                        log('expire out of limit');
                    }
                    mongooseCache[key]={cvalue:value,expire:(new Date).getTime()};
                });
            if(conf.log){
                log('Mongoose cached');
            }
            return Promise.resolve(value.cvalue);
        } else {
            return exec.call(this, function(err, value) {
                mongooseCache[key] = {cvalue:value,expire:(new Date).getTime()};
            });
        }
    };
    mongoose.Query.prototype.exec = execCache;
};
