module.exports=function(context,render,parse){
	return {
		_extend:'blog/common',
		index:function*(){
			context.body=yield render('blog/index.jade');
		}
	}
}