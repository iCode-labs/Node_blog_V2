module.exports=function(){
	var mongoose=require('mongoose'),
		User=mongoose.model('User');
	if(User.find().count==0){
		var user=new User();
		user.email="admin@admin.com";
		user.username="admin";
		user.password="password";
		console.log(user);
		user.saveUser();
	}
}