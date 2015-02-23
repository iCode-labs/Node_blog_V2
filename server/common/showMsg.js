module.exports = function(params, session, config, render) {
	var title = params.title || '提示';
	var msg = params.msg || '';
	var url = params.url || '';
	var second = params.second || 2;
	console.log(this);
	return render('common/msg', {
		msg: msg,
		second: second,
		url: url,
		title: title,
		pageData: session,
		config: config.template
	});
};