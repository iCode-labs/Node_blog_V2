module.exports=function(config,render){
	return{
		index:function*(){
			this.body=yield render('index',{
				config:config.template,
				title:'首页',
				pageData:{is_login:this.session.is_login}
			});
		}
	}
		
}