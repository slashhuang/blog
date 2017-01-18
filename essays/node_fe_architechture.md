# koa2 + react + redux 实践

> 最近半个月，笔者负责了公司的一个内部项目的web层。
> 由于自我感觉这个项目搭建的很不错，遂记录下个人的一些心得以便日后回顾。

> 这个项目从前到后的整体架构是比较典型的经典网络架构模式。
```bash
	# 负载均衡
	nginx 
	# web前端
	node + react[SPA]
	# SOA层
	java
	# 数据存储
	memcache + mysql
```
> 在整个的架构模式中，web层的权重由于nodejs的介入而显著提高。

## 技术选型

> 经过团队的讨论与对产品业务需求定性后，我们最后采用了如下的web层技术方案。

1. 前端 (MVVM)
	框架: react
	数据层: redux + redux-form
	工具库: underscore + babel-polyfill
	构建工具: webpack1 + gulp4
2. node (MVC)
	框架: koa2
	本地IO层: fs-extra
	网络api层: axios + co-body 
	转发层: node-http-proxy
	路由层: koa-router
	日志系统: winston
	工具库: lodash babel-polifyll
	构建工具: babel-register

> 做出这样的技术选型，我们的主要考虑点在于如下几点

1. 使用框架来指导工程师的代码编写，可以使代码质量和bug处理更加可控。
2. 采用ES6/7的代码来编写前后端代码，可以利用syntax sugar提高程序的表现力。
3. 在工具库上面，采用github上声誉极高的lodash，对工具util使用提供了极强的支持。
4. 采用async+await避免了yield及iterator的执行器逻辑，代码十分简洁。

> 






