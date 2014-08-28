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
})

BlogSchema.statics.getLatestPosts = function(page,callback){
  return this
  .find()
  .sort('field -date_created')
  .skip((page-1)*config.articlesperpage)
  .limit(config.articlesperpage)
  .find({}, callback)
}
BlogSchema.statics.getPostsPages=function(callback){
  return this
  .find()
  .count({},callback);
}
BlogSchema.statics.getPostsPagesByAuthor=function(authorid,callback){
  return this
  .find({'authorid':authorid})
  .count({},callback);
}
BlogSchema.statics.getLatestPostsByAuthor=function(authorid,page,callback){
  return this
  .find({'authorid':authorid})
  .sort('field -date_created')
  .skip((page-1)*config.articlesperpage)
  .limit(config.articlesperpage)
  .find({}, callback);
}
BlogSchema.methods={
  saveBlogPost:function(callback){
    var me =this;
    me.save(callback);
  }
};
//this happens before it saves, they are called middleware

BlogSchema.pre('save', function(next){
  console.log('Saving...');
  next();
});

//this happens before it removes, they are called middleware

BlogSchema.pre('remove', function(next){
  console.log('removing...');
  next();
});

//this happens when it inititializes, they are called middleware

BlogSchema.pre('init', function(next){
  console.log('initializing...');
  next();
});

mongoose.model('Blog',BlogSchema);
}
