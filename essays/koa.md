## 前言
> nodeJS自从2009年Ryan Dahl开始基于V8引擎在github上发布了最开始的版本，
> 发展的势头迅速蔓延到前端(浏览器)领域及后端web框架领域。

> 正如java中的spring框架，python中的flask框架一样，nodeJS自出世后就迅速在开源社区掀起了造轮子热潮。
> 相比total.js、Flatiron这类不温不火的框架，Express和Koa框架可谓是其中的领头羊，在技术社区不仅口碑良好，而且让开发者可以开启easy模式进行后端开发。
> 笔者在这一个月开始采用Koa来开发公司的一个node项目，在开发过程中阅读了一遍Koa2源码，遂写下这篇文章对Koa
> 框架进行一定的分析，有疏漏之处欢迎指正

## 正文
> 使用nodeJS下面的几行代码，就可以很轻易的搭建一个http服务器。
```js
    const http = require('http');
    http.createServer((req,res)=>{
        //做你想做的动作
        res.writeHead(200,{'Content-Type':"text/plain"});
        res.end('ok')
    }).listen(3000)
```
> 我们可以看到，一个经典的web应用模型最重要的两块数据就是request和response。
> 在这个基础上面，怎么分析request和处理response是web框架亟需解决的痛点和价值点。

> 下面我从Koa的设计理念、数据结构、中间件组成方式、代码组织的角度
> 来阐述我在阅读源码和架构项目的过程中对Koa的一些理解。

### Koa的设计理念
>