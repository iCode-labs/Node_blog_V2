module.exports = function() {
    var TagMap = require('./tagmap.js');
    var _ = require('underscore');
    var dateFormat = require('dateformat');
    var Blog = Database.models.blog;
    return {
        inittags: function*(next) {
            var tagsmap = new TagMap();
            var blogs =
                yield Blog.getLatestPosts();
            _.each(blogs, function(item) {
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
                archives.push(dateFormat((new Date(blogs[i].create_time)).getTime(), "yyyy-mm"));
            }
            return _.uniq(archives);
        }
    }
}
