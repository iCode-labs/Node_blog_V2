module.exports = function (msg,url,title,second,context){
    msg = msg||'';
    url= url||'/';
    title=title||msg;
    second=second||2;
    views=require('co-views');
    var render=views(Config.view,{
		map:{
			html:'swig'
		}
	});
	context.session.is_login=false;
    return render('common/msg.jade',{
    	msg:msg,second:second,url:url,title:title,config:Config,session:context.session
    });
}