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
		is_active: {
			type: Boolean,
			default: true
		},
		author_id: {
			type: String,
			required: true
		},
		author_name: {
			type: String,
			required: true
		},
		blog_type: {
			type: String,
			default: 'markdown'
		},
		blog_category: {
			type: String,
			default: 'undefined'
		},
		blog_tags: {
			type: Array,
			default: []
		},
		blog_comments: {
			type: Array,
			default: []
		},
		browse_times: {
			type: Number,
			default: 0
		},
		date_created: {
			type: Date,
			default: Date.now
		},
		date_updated: {
			type: Date,
			default: Date.now
		}
	});
	BlogSchema.statics.getLatestPosts = function() {
		return this
			.find()
			.sort('field -date_created')
			.limit(15)
			.find()
			.exec();
	};
	BlogSchema.statics.getCategoryPosts = function(category) {
		return this
			.find({
				"blog_category": category
			})
			.sort('field -date_created')
			.exec();
	};
	mongoose.model('Blog', BlogSchema);
}