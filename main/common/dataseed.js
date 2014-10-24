module.exports = function(config) {
	var mongoose = require('mongoose'),
		User = mongoose.model('User');
	if (User.find().count == 0) {
		var user = new User();
		user.user_name = "user";
		user.user_email = "user@admin.com";
		user.password = "password";
		user.save();
	}
}