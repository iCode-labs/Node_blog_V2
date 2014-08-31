module.exports = function(config, render) {
	return {
		index: function * () {
			this.body = yield render('index', {
				config: config.template,
				title: '首页',
				pageData: this.session
			});
		}
	}

}