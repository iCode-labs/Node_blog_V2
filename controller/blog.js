module.exports=function(config,render,parse){
	var mongoose=require('mongoose');
	return {
		create:function*(next){
			this.body=yield render('blog/create',{
				config:config.template,
				title:'发表博客',
				pageData:this.session
			});
		}
	}
}