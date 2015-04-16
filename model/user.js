module.exports = function() {
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        ObjectId = mongoose.ObjectId;
    var UserSchema = new Schema({
        email: {
            type: String,
            required: true
        },
        role:{
            type:String,
            required:true
        },
        password: {
            type: String,
            required: true
        },
        regist_time: {
            type: Date,
            default: Date.now
        }
    }, {
        collection: "Accounts"
    });
    UserSchema.statics.getAccounts=function(){
        return this.find().exec();
    };
    mongoose.model('User', UserSchema);
}
