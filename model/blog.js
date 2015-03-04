module.exports = function(config) {
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
        update_time: {
            type: Date,
            required: true
        }
    }, {
        collection: 'Blogs'
    });
    BlogSchema.statics.getLatestPosts = function() {
        return this
            .find()
            .sort('field -update_time')
            .limit(15)
            .find()
            .exec();
    };
    BlogSchema.statics.getCategoryPosts = function(category) {
        return this
            .find({
                "category": category
            })
            .sort('field -update_time')
            .exec();
    };
    BlogSchema.statics.getBlogsByTag = function(tag) {
        return this
            .find({
                "tags": tag
            })
            .sort('field -update_time')
            .exec();
    };
    mongoose.model('Blog', BlogSchema);
}
