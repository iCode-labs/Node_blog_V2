module.exports=function(config){
var mongoose = require('mongoose'),
Schema = mongoose.Schema, 
ObjectId = mongoose.ObjectId;
var BlogSchema  = new Schema({
    title         : { type: String, required: true }
  , body          : { type: String, required: true }
  , is_active     : { type: Boolean, default: true }
  , authorid      : { type: String, required: true }
  , authorname    : { type: String, required: true }
  , date_created  : { type: Date, default: Date.now }
  , date_updated  : { type: Date } 
});
mongoose.model('Blog',BlogSchema);
}
