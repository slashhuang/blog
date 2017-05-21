
# 模块化编程

> [课件](http://book.jirengu.com/fe/%E5%89%8D%E7%AB%AF%E8%BF%9B%E9%98%B6/%E6%A8%A1%E5%9D%97%E5%8C%96/AMD%E4%B8%8ECMD%E8%A7%84%E8%8C%83.html)

## 题目2： CMD、AMD、CommonJS 规范分别指什么？有哪些应用
<script src='1'></script>
=== window
<script src='2'></script>
=== window
<script src='3'></script>
> 解决命名冲突
> 依赖管理
> 在前端工程化潮流下，模块化拥有更多的含义，包括组件化+多人合作


模块化编程
amd ===> asynchronous module definition [require.js,sea.js]
node.js ==> commonJS {require + exports + module.exports}


规范解决的问题：
> JS没有模块系统、标准库较少(I/O)、缺乏包管理系统


## AMD 

a.js ===> [ b.js,c.js,d.js ]
b.js ===> [ b_1.js,b_2.js ] 
//a.js
define('a',['b','c','d'],function(b,c,d){
	b ==> //'b'
	c ==> //'c'
	d ==> //'d'
	var tmp = b + c + d ;//  'bcd'
	//将a.js的逻辑写在这里
})
//b.js 子依赖
define('b',['b_1','b_2'],function(){
	return 'b'
})
//c.js
define(function(){
	return 'c'
})
//d.js
define(function(){
	return 'd'
})

//----- 导出
// 如何写一个模块
define('模块名',[依赖数组],function(){
	return 你要导出的东西
})
// 如何写一个模块
define('模块名',function(){
	return 你要导出的东西
})
//-----导入
// 
define('模块名',[导入],function(){
	return 你要导出的东西
})
require([依赖],function(){
	
})








## 浏览器端

CMD: 
> 通用模块定义common module definition
> 通过 exports 暴露接口。这意味着不需要命名空间了，更不需要全局变量。这是一种彻底的命名冲突解决方案。
> 通过 require 引入依赖。这可以让依赖内置，开发者只需关心当前模块的依赖，其他事情 Sea.js 
> 都会自动处理好。

> 代表库： sea.js

```javascript
 	# 示例代码 dialog.js
	define(function(require, exports) {
	  var util = require('./util.js');
	  exports.init = function() {
	    // 实现代码
	  };
	});
	# html中
	<script src="sea.js"></script>
	<script>
	seajs.use('dialog', function(Dialog) {
	  Dialog.init(/* 传入配置 */);
	});
	</script>
```

AMD： 
> 异步模块定义asyncronous module definition 
> [阮老师的博客](http://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html)
> 代表库 require.js curl.js
```javascript
 	# 示例代码
	define([module1,module2],function(module1,module2){
		return {hello:'world'}
	
	})
```
## 服务端

CommonJS规范:
> 愿景是JS能够在任何地方运行
> 规范涵盖了模块、二进制、buffer、I/O、网关等。Node借鉴commonJS实现了一套简易的模块系统。

CommonJS模块规范:
1、模块引用
var math =require('math');
2、模块定义
exports.add = function(){
	console.log('math')
}
3、模块标示
> 小驼峰命名字符串、. 或者..路径













