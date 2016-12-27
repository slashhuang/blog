## 前言
> nodeJS自从2009年Ryan Dahl开始基于V8引擎在github上发布了最开始的版本，
> 发展的势头迅速蔓延到前端(浏览器)领域及后端web框架领域。

> 正如java中的spring框架，python中的flask框架一样，nodeJS自出世后就迅速在开源社区掀起了造轮子热潮。
> 相比total.js、Flatiron这类不温不火的框架，Express和Koa框架可谓是其中的领头羊，在技术社区不仅口碑良好，而且让开发者可以开启easy模式进行后端开发。
> 笔者在这个月开始采用Koa2来开发公司的一个node项目，在开发过程中阅读了一遍Koa2源码。
> 令我感到欣喜的是在阅读Koa2的源码的过程中，我感受到的不仅是代码的简短，更是Koa团队执笔的清晰思路。
> 下面就写下个人对koa2框架的整体理解。

## 正文
> 首先，使用下面的几行代码，就可以轻易的搭建一个nodeJS的http服务器。
```js
    const http = require('http');
    http.createServer((req,res)=>{
        //做你想做的动作
        res.writeHead(200,{'Content-Type':"text/plain"});
        res.end('ok')
    }).listen(3000)
```
> 我们可以看到，一个经典的web应用模型最重要的两块数据就是request和response。
> 编写一个web框架最先要解决的就是对request和response的处理和设计规范了。

> 下面我从Koa的设计理念、数据结构、中间件组成方式、代码组织的角度来展开对Koa的讨论

## Koa的设计理念

> Koa是一个轻量级的、极富表现力的http开发框架。
> 一个request会通过Koa的中间件栈，来动态处理最后的response。
> 同时，Koa2采用async和await的语法来增强中间件的表现力。
> 而Koa本身仅仅是定制了中间件的编写规范，而不内置任何中间件。

> 做过大型开源项目或者多人协作项目的同学应该都很有体会，
> 好的代码规范和设计方式的制定往往比写出好的代码更重要和更可控。
> koa的设计理念，让这个框架很容易发展庞大的中间件生态圈和保持高可维护性。
> 这是top-level的事情。

## Koa的中间件编写形式
> 一个简单的Koa2中间件通过下面几行代码就可以实现，我们就基于下面的代码展开讨论
```js
    app.use(async (ctx, next) => {
      try {
        await next(); // next is now a function
      } catch (err) {
        ctx.body = { message: err.message };
        ctx.status = err.status || 500;
      }
    });
```
### 1. 语法层面(syntax)
####  1. 选择更合适的程序控制流语法
``` js
    async + await
```
####  2. 选择对开发者更友好的getter,setter
``` js
    get  + set
```

### 2. 对开发者不可见的response+request属性代理层面(delegate)

###  1. delegates模块
``` js
   //以Response delegation为例
    delegate(proto, 'response')
      .method('attachment')
      .method('redirect')
      .method('remove')
      .method('vary')
      .method('set')
      .method('append')
      .method('flushHeaders')
      .access('status')
      .access('message')
      .access('body')
      .access('length')
      .access('type')
      .access('lastModified')
      .access('etag')
      .getter('headerSent')
      .getter('writable');
```



