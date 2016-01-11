var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var ctrls = {};

fs.readdirSync(Conf.controller).forEach(function(file) {
  if (file.indexOf('.js') != -1) {
    var ctrlName = file.split('.')[0];
    ctrls[ctrlName] = require(path.join(Conf.controller, file));
  }
});

exports = module.exports = ctrls;
