module.exports = function(config) {
    var tagmap = require('./tagmap.js'),
        _ = require('underscore'),
        mongoose = require('mongoose'),
        dateFormat = require('dateformat'),
        Blog = mongoose.model('Blog');
    return {
        inittags: function*(next) {
            var tagsmap = new tagmap();
            var blogs =
                yield Blog.getLatestPosts();
            blogs.forEach(function(item) {
                if (!_.isNull(item.tags)) {
                    for (var i = 0; i < item.tags.length; i++) {
                        if (!tagsmap.containsKey(item.tags[i])) {
                            tagsmap.put(item.tags[i], 1);
                        } else {
                            tagsmap.addValue(item.tags[i]);
                        }
                    }
                }
            });
            return tagsmap.keyValues();
        },
        initArchives: function*(next) {
            var blogs =
                yield Blog.getBlogs();
            var archives = [];
            for (var i = 0; i < blogs.length; i++) {
                archives.push(dateFormat(blogs[i].create_time.getTime(), "yyyy-mm"));
            }
            return _.uniq(archives);
        }
    }
}
