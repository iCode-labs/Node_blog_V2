var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');
var _ = require('underscore');
var Schema = mongoose.Schema;
var database = {
    models: {}
};

exports = module.exports = database;

fs.readdirSync(Conf.model).forEach(function(file) {
    if (file.indexOf('.js') != -1) {
        var modelName = file.split('.')[0];
        var schema = require(path.join(Conf.model, file));
        var modelSchema = new Schema(schema.Schema, schema.collection);
        _.each(schema.statics, function(method, name) {
            modelSchema.statics[name] = method;
        });
        database.models[modelName] = mongoose.model(modelName, modelSchema);
        _log("load mongoose model --> " + modelName);
    }
});
