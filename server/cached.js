'use strict';
exports = module.exports = cache;
global.mongooseCache = {};

function cache(mongoose) {
    var exec = mongoose.Query.prototype.exec;
    var execCache = function() {
        if (mongooseCache) {
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
                return Promise.resolve(value);
            } else {
                return exec.call(this, function(err, value) {
                    mongooseCache[key] = value;
                });
            }
        } else {
            global.mongooseCache = {};
            return exec.call(this, function(err, value) {
                mongooseCache[key] = value;
            });
        }
    };
    mongoose.Query.prototype.exec = execCache;
};
