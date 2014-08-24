module.exports=function(context,render,parse){
	return{
		login:function*(){
			context.session.currentUrl='/auth/auth/login';
			context.body=yield render('auth/login.jade',{
					config:Config.template,
					title:'用户登录',
					session:context.session,
				});
		},
		register:function*(){
			context.session.currentUrl='/auth/auth/register';
			context.body=yield render('auth/register.jade',{
					config:Config.template,
					title:'用户注册',
					session:context.session,
				});
		}
	}
}