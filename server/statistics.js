'use strict';

exports = module.exports = statistics;
var Log = Database.models.log;
var uuid = require('uuid');

function statistics(opts) {
  return function*(next) {
    var ip = this.ip;
    var date = new Date;
    var ulog = new Log();
    var uid = this.cookies.get('m__uuid');
    if (!uid) {
      uid = uuid.v1();
      this.cookies.set('m__uuid', uid);
    }
    ulog.ip = ip;
    ulog.uuid = uid;
    ulog.save();
    yield next;
  }
}
