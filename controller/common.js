module.exports = function(config, render, parse) {

	var showMsg = function(title, msg, url, second, session) {
		title = title || msg;
		msg = msg || '';
		url = url || '';
		second = second || 2;
		webtitle = '';
		return render('common/msg', {
			msg: msg,
			second: second,
			url: url,
			title: title,
			pageData: session,
			webtitle: title,
			config: config.template
		});
	};
	return {
		notFound: function * (next) {
			this.body = yield showMsg('404', '找不到请求的页面', '/', 4, this.session);
		}
	}
}