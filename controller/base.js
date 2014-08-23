module.exports=function(context,render,parse){
	return {
		index:function*(){
			context.session.is_login=false;
			
			console.log('sss');
			context.body=yield render('index.jade',{
				config:Config.template,
				title:'首页',
				session:context.session
			});
		}
	}
}