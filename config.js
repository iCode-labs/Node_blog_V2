module.exports = function(root) {
	return {
		mongodb: 'mongodb://Air.local:27017/blogdatabase',
		model: root + '/model/',
		view: root + '/view/',
		controller: root + '/controller/',
		mainpath: root + '/main/',
		secret: '1234!@#$',
		port: 8080,
		template: {
			webtitle: 'rain\'blog',
			articlesperpage: 5,
			usernavs: [{
				text: '最新',
				href: '/newblogs'
			}, {
				text: 'Web',
				href: '/web'
			}, {
				text: '游戏',
				href: '/game'
			}, {
				text: '发表',
				href: '/create'
			}],
			guestnavs: [{
				text: '最新',
				href: '/newblogs'
			}, {
				text: 'Web',
				href: '/web'
			}, {
				text: '游戏',
				href: '/game'
			}]
		}
	}
}