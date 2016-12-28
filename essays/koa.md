## 前言
> nodeJS自从2009年Ryan Dahl开始基于V8引擎在github上发布了最开始的版本，

> 发展的势头迅速蔓延到前端(浏览器)领域及后端web框架领域。

> 正如java中的spring框架，python中的flask框架一样，nodeJS自出世后就迅速在开源社区掀起了造轮子热潮。

> 相比total.js、Flatiron这类不温不火的框架，Express和Koa框架可谓是其中的领头羊，

> 在技术社区不仅口碑良好，而且让开发者可以开启easy模式进行后端开发。

> 笔者在这个月开始采用Koa2来开发公司的一个node项目，在开发过程中阅读了一遍Koa2源码。

> 令我感到欣喜的是在阅读Koa2的源码的过程中，我感受到的不仅是代码的简短，更是Koa团队执笔的清晰思路。

> 下面就写下个人对koa2框架中属性代理和中间件语法的理解。

## 一个简单的http服务器

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

> 下面我从Koa的设计理念、数据结构、中间件组成方式的角度来展开对Koa的讨论

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
    async (ctx,next)=>{
        await next();
        // 做你的工作
    }
```
> 程序控制流上面采用了async+await语法来生成Promise形式的程序控制流。

> 这种形式的控制流让整个Koa框架中间件的访问呈现出```自上而下的中间件流 + 自下而上的response数据流```的形式。

> 官方对控制流的gif描述要比我形象许多，我这里贴下官方的图片描述。

![koa官方中间件控制流](https://github.com/koajs/koa/blob/v2.x/docs/middleware.gif?raw=true)

> 在async和await的内部技术实现上是采用的Promise的形式，所以```return Promise```可以直接挂到```await```后面

```js
      var p = await new Promise(resolve => {
                    setTimeout(() => {
                      resolve(10);
                }, 2000);
     console.log(p) //2秒后打印10
```
> koa2在实现这种中间件调用方式上是通过next()来延续的，

> 虽然redux和Koa2都是执行栈指针在中间件数组不断偏移的过程，但是在技术实现上Koa2结合Promise后采用的是递归调用的形式。

> Koa2中间件模块编写直接采用的是```koa-compose```，

> 我在这边直接贴下koa-compose的核心代码。

```javascript
    // return Promise
   function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i] //调用下一个middleware
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        //在middleware中传递next方法
        return Promise.resolve(fn(context, function next () {
          return dispatch(i + 1)
        }))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
```
> 可以看到Koa-compose基本就是个中间件dispatch的递归调用，实现上还是蛮简单的。

> 在Koa中间件编写上面，看我上面的注释可以看到middlewareFunction的第二个参数(也就是next)，

> 会调取下一轮中间件的执行dispatch(index)来进行后续流程。

> 这个过程导致了中间件函数的不断嵌套，得以使得所有的中间件能够自上而下被执行。

> 同时由于中间件async+await的写法编译后，返回的是根据context._send的switch调用，

> 所以在调用await next()后的代码会自下而上执行。


####  2. 属性代理层面之getter,setter,delegates
``` js
    /**
     * //文件位置 koa/lib/response.js
     * //代码作用 set response status code.
     */
    set status(code) {
        assert('number' == typeof code, 'status code must be a number');
        assert(statuses[code], `invalid status code: ${code}`);
        assert(!this.res.headersSent, 'headers have already been sent');
        this._explicitStatus = true;
        this.res.statusCode = code;
        this.res.statusMessage = statuses[code];
        if (this.body && statuses.empty[code]) this.body = null;
    },
    /**
     * //文件位置 koa/lib/context.js
     * //代码作用 Response delegation
     */
    var delegate =require('delegates');
    delegate(ctx, 'response')
        .access('status');
```
> 如上的示例代码是Koa2中属性代理的一个经典模式，

> 这种模式一方面采用setter和getter的形式(好处参见Vue.js的vm属性digest的设计),

> 简化了开发者同步设置statusCode等的工作。

> 同时将属性配置代理到ctx对象上面,让开发者采用```ctx.status=500```即可完成response的设置。

> 总体而言，这个设计思想还是很犀利的，而且对开发者足够友好。

> 为了方便大家熟悉koa的属性代理，我把源码中属性代理的一部分，根据method/access/getter分类贴在了下面。

###  1. delegates模块
``` js
   /**
    * 请求处理的代理列表
    * Response delegation
    */
    delegate(proto, 'response')
    method:[ 'attachment' , 'redirect' , 'remove' ,'vary' ,'set' ,'append' ,'flushHeaders' ],
    access:['status' , 'message' , 'body' ,'length' ,'type','lastModified' ,'etag' ],
    getter:[  'headerSent' ,'writable' ]
   /**
    * 请求的代理列表[Incoming message]
    * Request delegation
    */
    delegate(proto, 'request')
    method:[  'acceptsLanguages' , 'acceptsEncodings' , 'acceptsCharsets' ,'accepts' ,'get' ,'is'  ],
    access:[ 'querystring' ,'idempotent' , 'socket' ,'search' ,'method' ,'query' ,'path' ,'url' ],
    getter:[  'origin' , 'href' ,'subdomains' ,'protocol' ,'host' ,'hostname'
            'header' ,'headers' ,'secure' ,'stale' ,'fresh' ,'ips' ,'ip' ]

```

> 文末，安利下最近在公司写的一个koa2的boilerplate提供给大家作为快速开发的模板项目。

> 这个项目是个比较典型的MVC(middleware+ view + controller)项目模板。

> 它集成了日志系统、router、promise network、error handling和不同的开发环境配置

> 相信应该会对大家在Koa2开发上有所裨益。

[原文地址参见我的github博客](https://github.com/slashhuang/blog/blob/master/essays/koa.md)

##### 参考资料
1. [get set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set)
2. [async await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)



