module.exports=function(config,render){
	return {
		login:function*(next){
			this.body=yield render('auth/login',{
				config:config.template,
				title:'用户登录',
				pageData:{is_login:this.session.is_login}
			});
		},
		register:function*(next){
			this.body=yield render('auth/register',{
				config:config.template,
				title:'用户注册',
				pageData:{is_login:this.session.is_login}
			});
		},
		onlogin:function*(next){
			this.body=yield render('common/msg',{
				config:config.template,
				title:'用户注册',
				pageData:{is_login:this.session.is_login},
				msg:'登录成功',
				url:'/',
				second:2
			});
		}
	}
}