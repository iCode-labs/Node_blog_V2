var path = require('path');

module.exports = function(root) {
    return {
        mongodb: 'mongodb://gcf:955479ham@106.184.0.98:27017/blogdb',
        model: path.join(root, 'model'),
        view: path.join(root, 'view'),
        controller: path.join(root, 'controller'),
        mainpath: path.join(root, 'server'),
        secret: '1234!@#$',
        root: root,
        disqus_shortname: 'disqus',
        port: 8002,
        template: {
            webtitle: 'blog',
            navs: [{
                text: '最新',
                href: '/'
            }, {
                text: 'Javascript',
                href: '/category/javascript'
            }, {
                text: 'Node.js',
                href: '/category/nodejs'
            }, {
                text: 'V8',
                href: '/category/v8'
            }, {
                text: 'Python',
                href: '/category/python'
            }, {
                text: '算法',
                href: '/category/algorithm'
            }]
        }
    }
}
