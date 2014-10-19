module.exports = function(root) {
	return {
		mongodb: 'mongodb://Air.local:27017/blogdatabase',
		model: root + '/model/',
		view: root + '/view/',
		controller: root + '/controller/',
		mainpath: root + '/main/',
		secret: '1234!@#$',
		disqus_shortname: 'gaochenfei',
		port: 8080,
		template: {
			webtitle: 'rain\'blog',
			articlesperpage: 5,
			usernavs: [{
				text: '最新',
				href: '/newblogs'
			}, {
				text: 'Node.js',
				href: '/category/nodejs'
			}, {
				text: 'Python',
				href: '/category/python'
			}, {
				text: '游戏',
				href: '/category/game'
			}, {
				text: '发表',
				href: '/create'
			}],
			guestnavs: [{
				text: '最新',
				href: '/newblogs'
			}, {
				text: 'Node.js',
				href: '/category/nodejs'
			}, {
				text: '游戏',
				href: '/category/game'
			}, {
				text: 'Python',
				href: '/category/python'
			}]
		}
	}
}