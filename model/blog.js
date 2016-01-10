var blog = {};
exports = module.exports = blog;

blog.Schema = {
  blog_title: {
    type: String,
    required: true
  },
  blog_content: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  author: {
    type: String,
  },
  category: {
    type: String,
    default: 'undefined'
  },
  tags: {
    type: Array,
    default: []
  },
  visits: {
    type: Number,
    default: 0
  },
  create_time: {
    type: Date,
    required: true
  },
  update_time: {
    type: Date,
    required: true
  }
};

blog.collection = {
  collection: "Blogs"
};

blog.statics = {
  getBlogById: function(id) {
    return this.findOne({
      "_id": id
    }).exec();
  },
  getBlogs: function() {
    return this.find().exec();
  },
  getLatestPosts: function() {
    this
      .find()
      .sort('field -create_time')
      .limit(15)
      .exec();
    return this
      .find()
      .sort('field -create_time')
      .limit(15)
      .find()
      .exec();
  },
  getCategoryPosts: function(category) {
    return this
      .find({
        "category": category
      })
      .sort('field -create_time')
      .exec();
  },
  getBlogsByTag: function(tag) {
    return this
      .find({
        "tags": tag
      })
      .sort('field -create_time')
      .exec();
  },
  deleteById: function(id) {
    return this.find({
      "_id": id
    }).remove().exec();
  }
};
