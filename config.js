var path = require('path');

module.exports = function(root) {
    return {
        mongodb: 'mongodb://127.0.0.1:27017/blogdb',
        model: path.join(root, 'model'),
        view: path.join(root, 'view'),
        controller: path.join(root, 'controller'),
        mainpath: path.join(root, 'server'),
        secret: '1234!@#$',
        root: root,
        disqus_shortname: 'gaochenfei',
        pushtoken: 'what you should see',
        port: 8002,
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
                text: '其他',
                href: '/category/other'
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
                text: 'Python',
                href: '/category/python'
            }, {
                text: '游戏',
                href: '/category/game'
            }, {
                text: '其他',
                href: '/category/other'
            }]
        }
    }
}
