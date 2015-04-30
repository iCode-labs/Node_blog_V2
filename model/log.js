module.exports = function() {
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        ObjectId = mongoose.ObjectId;
    var LogSchema = new Schema({
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
    }, {
        collection: "Logs"
    });
    LogSchema.statics.getLogs = function() {
        return this.find().exec();
    };
    mongoose.model('Log', LogSchema);
}
