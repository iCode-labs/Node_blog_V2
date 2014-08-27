module.exports=function(context,render,parse){
	return {
		index:function*(){
			context.session.currentUrl='/';
			context.body=yield render('index.jade',{
				config:Config.template,
				title:'首页',
				session:context.session,
			});
		},
		auth:function*(){
			if(false==context.session.is_login){
				context.body=yield render('common/msg.jade',{
					msg:'请先登录',
					url:'/auth/auth/login',
					config:Config.template,
					title:'首页',
					session:context.session,
					second:2
				});
			}
		}
	}
}