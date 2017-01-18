# koa2 + react + redux 实践

> 最近半个月，笔者负责了公司的一个内部项目的web层。
> 由于自我感觉这个项目搭建的很不错，遂记录下个人的一些心得以便日后回顾。

> 这个项目从前到后的整体架构是比较典型的网络架构模式。
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
> 在整个的架构模式中，web层的权重由于nodejs的介入而显著提高.
> nodeJS控制路由、http状态，衔接前端和java层。
> 而前端开发由于node的引入，
> 可以轻松mock数据、个性化java层的数据结构，因此开发也很省心省力。
> 同时，丰富的npm模块及前端熟悉的异步场景，大大简化了我们的开发。

## 技术选型

> 经过团队的讨论与对产品业务需求定性后，我们采用了如下的web层技术方案。

1. 前端 (MVVM)
	框架: react
	UI框架: ant-design
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

> 做出这样的技术选型，我的主要考虑点如下:

1. 使用框架来指导工程师的代码编写，可以使代码质量和bug处理更加可控。

2. 采用ES6/7的代码来编写前后端代码及async+await语法，避免了回调地狱，代码十分简洁。

3. 在工具库上面，github上声誉极高的lodash提供了足够强大的函数库。

4. 对于图片上传等大数据buffer场景，采用proxy的形式直接转发request包。

5. 错误处理上面采用winston及Promise的catch形式来监控所有的异常。

## 架构模式评价

> 这样的技术选型让框架来驱动开发，对开发者来说足够简单和快捷。
> 由于业务场景不涉及到丰富的IO操作，重网络请求的场景下async+await提供了足够好的异常及数据处理。
> 前端开发这块，由于对SEO要求不高，因此SPA的模式的劣势并不大。
> 采用ant-design和redux-form对于我们的工作量有着显著减少的功效。

### 总结
> 由于这个node+前端项目，是笔者第一次从零到一实施完成的，
> 所以在项目架构上可能存在不少疏漏，读者有好的建议希望能够提给我~






