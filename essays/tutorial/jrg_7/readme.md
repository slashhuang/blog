
[任务地址](http://jscode.me/t/html5-css3/246)

-------------------------------------------------------

题目1： HTML5是什么？有哪些新特性？有哪些新增标签？如何让低版本的 IE 支持 HTML5新标签

HTML5是应用超文本标记语言（HTML）第五次重大修改产生的规范。

特性:
Semantic :
语义化网页意义和结构

本地存储特性:  
APP cache 、IndexDB

MULTIMEDIA:
audio video等

三维、图形及特效特性:
svg canvas webGL

浏览器层面:

webRTC

Server-Sent Event和WebSockets


新增标签：header nav footer article section aside dialog audio vedio

[参考资料](http://baike.baidu.com/link?url=fVV77B2SuvDfjAbnMVF0s0F_QWiadbf4by5xar2iEY-xpXAMw__D4U4egyGvPeiXXuial2wfguGDn6BdIZBJ7a)
-------------------------------------------------------

题目2： input 有哪些新增类型？
type:  color / date / datetime
autocomplete
autofocus
...
[htm5新增input属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)

-------------------------------------------------------


题目3： 浏览器本地存储中 cookie 和 localStorage 有什么区别？ localStorage 如何存储删除数据。

3.1 同: 

同源策略、浏览器端

3.2 区别: 

存储区大小: cookie : 4K ; localStorage 5M

应用场景: cookie ==> http请求 ;  localStorage 5M ==> 离线存储

过期时间: cookie ==> 有过期时间;  localStorage ==> 永久存储


3.3 一些trick

对于不支持localStorage的浏览器可以通过cookie来模拟它的功能


3.4 localStorage提供的api

localStorage.colorSetting = '#a4509b';
localStorage['colorSetting'] = '#a4509b';
localStorage.setItem('colorSetting', '#a4509b');
localStorage.removeItem('colorSetting');


-------------------------------------------------------


























