module.exports=function(config,render,parse){
	var mongoose=require('mongoose'),
		User=mongoose.model('User');
	var showMsg=function(title,msg,url,second,session){
		title=title||msg;
		msg=msg||'';
		url=url||'';
		second=second||2;
		webtitle='';
		return render('common/msg',{
			msg:msg,
			second:second,
			url:url,
			title:title,
			pageData:session,
			webtitle:title,
			config:config.template
		});
	};

	return {
		login:function*(next){
			console.log(Functions);
			this.body=yield render('auth/login',{
				config:config.template,
				title:'用户登录',
				pageData:this.session
			});
		},
		register:function*(next){
			this.body=yield render('auth/register',{
				config:config.template,
				title:'用户注册',
				pageData:this.session
			});
		},
		onlogin:function*(next){
			var pageData=yield parse(this);
			var account=pageData.account;
			var password=pageData.password;
			var user=yield User.findOne({'email':account}).exec();
			if(!Functions.isNull(user))
			{
				if(password==user.password)
				{
					this.session.is_login=true;
					this.user=user;
					this.body=yield showMsg('登录成功','欢迎回来'+user.username,'/',4,this.session);
				}else{
					this.body=yield showMsg('登录失败','密码错误','/login',4,this.session);
				}
				
			}else{
				this.body=yield showMsg('登录失败','没有该用户','/login',4,this.session);
			}
			
		},
		
	}
}