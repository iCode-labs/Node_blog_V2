module.exports = function(config) {
	var mongoose = require('mongoose'),
		User = mongoose.model('User'),
		base64 = require(config.mainpath + 'common/base64.js');
	if (User.find().count == 0) {
		var user = new User();
		user.userId = base64.b64encode("admin");
		user.user_name = "admin";
		user.user_email = "admin";
		user.password = "password";
		user.save();
	}
}