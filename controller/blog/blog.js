module.exports=function(context,render,parse){
	return {
		_extend:'blog/common',
		index:function*(){
			console.log('11');
			context.body=yield render('blog/index.jade');
		}
	}
}