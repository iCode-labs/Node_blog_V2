Nodejs koa MVC blog
-----

一个基于Nodejs koa的博客网站，使用MVC风格的代码架构。

demo：http://www.mirana.me

Folder structure
=====

```
.
├── bin                         #启动脚本
├── controller                  #controller
├── model                       #model
├── public                      #静态文件夹
│   ├── admin                   #后台
│   │   ├── css
│   │   ├── js
│   │   ├── modules
│   │   │   ├── authentication
│   │   │   └── main
│   │   └── templates
│   │       └── partials
│   ├── css                     #css
│   ├── fonts
│   ├── image
│   ├── js
│   └── upload
│       └── images
├── server                      #server core
└── view                        #Jade模板
    ├── admin
    ├── auth
    ├── blog
    └── common
```
    
Features
=====

* markdown格式支持
* highlight.js 代码高亮
* MVC代码风格
* jade模板引擎
* disqus评论
* Node 0.12 
* mongoose mongodb ORM module
* 后台管理基于angular.js

Install
=====

    1. npm install -g pm2
    2. git clone https://github.com/flex1988/Node_blog_V2.git
    3. cd Node_blog_V2
    4. npm install
    5. chmod u+x ./bin/run.sh
    6. ./bin/run.sh
    
ScreenShot
=====

![img](./public/image/screenshot.png)

