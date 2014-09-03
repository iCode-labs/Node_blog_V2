module.exports = function(root) {
	return {
		mongodb: 'mongodb://',
		model: root + '/model/',
		view: root + '/view/',
		controller: root + '/controller/',
		mainpath: root + '/main/',
		secret: '1234!@#$',
		port: 8080,
		template: {
			webtitle: 'Notes',
			articlesperpage: 5,
			usernavs: [{
				text: '最新',
				href: '/newblogs'
			}, {
				text: '精华',
				href: '/'
			}, {
				text: '我的博客',
				href: '/myblogs'
			}, {
				text: '发表',
				href: '/create'
			}, ],
			guestnavs: [{
				text: '最新',
				href: '/newblogs'
			}, {
				text: '精华',
				href: '/essen'
			}, {
				text: '分类',
				href: '/'
			}],
			userfuncs: [{
				text: '个人信息',
				href: '/personInfo'
			}, {
				text: '注销',
				href: '/logout'
			}],
			guestfuncs: [{
				text: '登陆',
				href: '/login'
			}, {
				text: '注册',
				href: '/register'
			}]
		}
	}
}