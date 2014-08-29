module.exports=function(config){

var mongoose = require('mongoose'),
Schema = mongoose.Schema, 
ObjectId = mongoose.ObjectId;
var UserSchema  = new Schema({
  username         : { type: String, required: true }
  , email          : { type: String, required: true }
  , password     : { type: String, required: true  }
  , date_created  : { type: Date, default: Date.now }
  , date_updated  : { type: Date ,default: Date.now } 
});

mongoose.model('User',UserSchema);
}

