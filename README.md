Nodejs koa MVC blog
-----

一个基于Nodejs koa的博客网站，使用MVC风格的代码架构。

demo：http://www.mirana.me

Folder structure
=====

```
├── bin                 #启动脚本
├── controller          #业务逻辑中间件
├── model               #mongoose Schema
├── public              #static folder
│   ├── fonts           #字体
│   ├── image           #图片
│   ├── js              #js
│   ├── stylesheets     #css
│   └── upload          #上传文件夹
│       └── images
├── server              #server服务端core代码
│   └── common          #server用到的闭包代码
└── view                #Jade模板
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

Blog Manager
=====

![Blog Manager](https://github.com/flex1988/blog_manager)
基于Flask+Angular，管理blog。

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

