> JavaScript自面世之后，就成为浏览器的标准脚本语言，
> 然而JS本身并没有内置python和java的package包、module模块的import语法。
> 严格意义上来说，浏览器端的JS必须依赖其他方式完成多个JS文件的拆分及关联工作。
> 当然，我们程序员是擅长解决问题的。
> 解决方案的演进大致按照如下的方式进行:

1、script标签加载脚本 + window对象形成引用关系
2、
> 在上一条原始加载方式的基础上，定制异步加载规范AMD，
> 让所有的JS文件采用window.define方式缓存在define内部的module对象上。
> 这种方式的优化点在于引入了*加载器(bundler)*的概念来关联所有的文件。
> 一个简单AMD规范文件代码如下，第一个参数'test'是个文件标示符,第二个参数是define的回调函数。
```javascript
	define(["test"], function (test) {
		console.dir(test)
	　　	return 1
	　});
```
这里关于AMD只看代码而不做细致讨论，有兴趣的同学可以去看标配的AMD实现[require.js](http://www.requirejs.cn/)
3、
> 在AMD的基础上，JS在node领域也终于借助node的IO及fs能力实践了CommonsJS规范，
> 通过require('文件地址')，即可引入另一个文件的module.exports对象。
```javascript
	// test.js
	module.exports={a:1}
	// 另一个文件
	console.log(require('./test.js')) //打印{a:1}
```
以上的讨论只是简单的回顾了下JS模块规范演进的过程，现在我们还是回到主题webpack上面来。
由于JS在browser和node领域的大放异彩，一份JS文件能同时运行在前后端环境的趋势催生了browserify及更强大的模块加载器(bundler)的需求。
于是，程序员们开发了webpack -- 一个非常优雅而简单的*前端JS file module解决方案*！