'use strict';

var redis = require('redis');
var _ = require('underscore');
var debug=require('debug')('mongoose_cache');

function cache(mongoose, opts) {
    var exec = mongoose.Query.prototype.exec;
    var opts = opts || {
        expire: 15 * 60 * 1000,
        host: 'localhost',
        port: 6379
    };
    var redisClient = redis.createClient(opts.port, opts.host);
    var cacheList = {};
    var execCache = function() {
        var key = JSON.stringify({
            modelName: this.model.modelName,
            conditions: this._conditions
        });
        var me = this;
        var params = arguments;
        return new Promise(function(resolve, reject) {
            if (me.__cache && cacheList[key] && ((new Date).getTime() - cacheList[key].expire < opts.expire)) {
                 redisClient.get(key, function(err, val) {
                    if (val) {
                        debug('object cached key:%s',key);
                        var res = JSON.parse(val);
                        if (Array.isArray(res)) {
                            _.each(res, function(item) {
                                item.__proto__ = cacheList[key].proto;
                            });
                        } else {
                            res.__proto__ = cacheList[key].proto;
                        }
                        return resolve(res);
                    } else if (err) {
                        debug('object cached but err happend key:%s',key);
                        return reject(err);
                    }
                });
            } else if (me.__cache) {
                debug('object not cached key:%s',key);
                return exec.call(me, function(err, val) {
                    if (err)
                        reject(err);
                    debug('cache object to redis key:%s',key);
                    redisClient.set(key, JSON.stringify(val));
                    cacheList[key] = {};
                    cacheList[key].expire = (new Date).getTime();
                    cacheList[key].proto = Array.isArray(val) ? val[0].__proto__ : val.__proto__;
                    resolve(val);
                });
            } 
            else if(me.__delcache){
                debug('delete cache key:%s',key);
                return resolve(null);
            }
            else if(!me.__cache){
                debug('cache not enabled key:%s',key);
                return exec.call(me, function(err, val) {
                    if (err)
                        reject(err);
                    resolve(val);
                });
            }

        });
    }

    var cache = function() {
        debug('enable cache');
        this.__cache = true;
        return this;
    }

    var delcache = function() {
        debug('delete cache');
        this.__delcache=true;
        var key = JSON.stringify({
            modelName: this.model.modelName,
            conditions: this._conditions
        });
        if (cacheList[key]) {
            delete cacheList[key]
        }
        return this;
    }

    mongoose.Query.prototype.exec = execCache;
    mongoose.Query.prototype.cache = cache;
    mongoose.Query.prototype.delcache = delcache;
}

exports = module.exports = cache;

