module.exports = function(config) {
	var tagmap = require('./tagmap.js'),
		underscore = require('underscore'),
		mongoose = require('mongoose'),
		Blog = mongoose.model('Blog');
	return {
		inittags: function * (next) {
			var tagsmap = new tagmap();
			var blogs = yield Blog.getLatestPosts();
			blogs.forEach(function(item) {
				if (!underscore.isNull(item.blog_tags)) {
					for (var i = 0; i < item.blog_tags.length; i++) {
						if (!tagsmap.containsKey(item.blog_tags[i])) {
							tagsmap.put(item.blog_tags[i], 1);
						} else {
							tagsmap.addValue(item.blog_tags[i]);
						}
					}
				}
			});
			return tagsmap.keyValues();
		}
	}
}