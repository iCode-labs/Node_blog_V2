module.exports=function(context,render,parse){
	var middleWare={};
	middleWare.init=function*(){};
	middleWare.msg=function(msg,url,title,second){
		msg=msg||'';
		url=url||'';
		title=title||msg;
		second=second||2;
		return render('common/msg.jade',{msg:msg,second:second,url:url,title:title});
	}

	var controllerModule=require(Config.controller+Request.module+'/'+Request.controller+'.js')(context,render,parse);
	var extendController={};
	controllerModule._extend=controllerModule._extend||'';
	if(''!=controllerModule._extend)
		extendController=require(Config.controller+'/'+controllerModule._extend+'.js')(context,render,parse);
	Functions.extend(middleWare,extendController);
	Functions.defaults(controllerModule,middleWare);
	return controllerModule;
}