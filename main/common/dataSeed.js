module.exports = function(config) {
	var mongoose = require('mongoose'),
		User = mongoose.model('User'),
		base64 = require(config.mainpath + 'common/base64.js');
	if (User.find().count == 0) {
		var user = new User();
		user.user_name = "Rain";
		user.user_email = "gao_chenfei@163.com";
		user.password = "955479ham";
		user.save();
	}
}