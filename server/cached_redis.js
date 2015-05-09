'use strict';

var redis = require('redis');
var log = require('util').log;
var _ = require('underscore');
var redisClient = redis.createClient();

function cache(mongoose, opts) {
    var exec = mongoose.Query.prototype.exec;
    var remove = mongoose.Query.prototype.remove;
    var opts = opts || {
        expire: 15 * 60 * 1000
    };
    var cacheList = {};
    var execCache = function() {
        var key = JSON.stringify({
            modelnName: this.model.modelName,
            contidions: this._conditions
        });
        var me = this;
        return new Promise(function(resolve, reject) {
            if (cacheList[key] && ((new Date).getTime() - cacheList[key] < opts.expire)) {
                redisClient.get(key, function(err, val) {
                    if (val && !me.__Cachefunc) {
                        return resolve(JSON.parse(val));
                    } else if (err) {
                        console.log("err");
                        return reject(err);
                    } else if (me.__Cachefunc && me.__Cachefunc == 'remove') {
                        return exec.apply(me, arguments);
                    }
                });
            } else {
                return exec.call(me, function(err, val) {
                    redisClient.set(key, JSON.stringify(val));
                    cacheList[key] = (new Date).getTime();
                    resolve(val);
                });
            }

        });
    }
    var removeCache = function() {
        this.__Cachefunc = 'remove';
        return remove.apply(this, arguments);
    }

    mongoose.Query.prototype.exec = execCache;
    mongoose.Query.prototype.remove = removeCache;
}

exports = module.exports = cache;
