var path = require('path');
var fs = require('fs');

var database = {
    models: {}
};

exports = module.exports = database;



fs.readdirSync(path.join(config.model)).forEach(function(file) {
    if (file.indexOf('.js') != -1) {
        var model = file.split('.')[0];
        log(model);
        database.models[model] = require(path.join(config.model,file));
    }
});
