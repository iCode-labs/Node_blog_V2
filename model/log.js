var log = {};

exports = module.exports = log;

log.Schema = {
  uuid: {
    type: String,
    required: true
  },
  ip: {
    type: String,
    required: true
  },
  visit_time: {
    type: Date,
    default: Date.now
  }
};

log.collection = {
  collection: 'log'
};

log.statics = {
  getlogs: function() {
    return this.find().exec();
  }
};
