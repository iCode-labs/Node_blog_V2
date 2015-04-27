module.exports = function() {
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        ObjectId = mongoose.ObjectId;
    var BlogSchema = new Schema({
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
    }, {
        collection: 'Blogs'
    });
    BlogSchema.statics.getBlogById = function(id) {
        return this.findOne({
            "_id": id
        }).exec();
    }
    BlogSchema.statics.getBlogs = function() {
        return this.find().exec();
    };
    BlogSchema.statics.getLatestPosts = function() {
        return this
            .find()
            .sort('field -create_time')
            .limit(15)
            .find()
            .exec();
    };
    BlogSchema.statics.getCategoryPosts = function(category) {
        return this
            .find({
                "category": category
            })
            .sort('field -create_time')
            .exec();
    };
    BlogSchema.statics.getBlogsByTag = function(tag) {
        return this
            .find({
                "tags": tag
            })
            .sort('field -create_time')
            .exec();
    };
    BlogSchema.statics.deleteById = function(id) {
        return this.find({
            "_id": id
        }).remove().exec();
    }
    mongoose.model('Blog', BlogSchema);
}
