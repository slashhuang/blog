
[任务地址](http://jscode.me/t/html5-css3/246)

-------------------------------------------------------

题目1： HTML5是什么？有哪些新特性？有哪些新增标签？如何让低版本的 IE 支持 HTML5新标签

HTML5是应用超文本标记语言（HTML）第五次重大修改产生的规范。

[mdn HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)

1、 语义化 ===> SEO(search engine optimization搜索引擎优化)
<html>
	<head>
	</head>
	<body>
		<ul>
			<li></li>
		</ul>
		<dl>
			<dt></dt>
			<dd></dd>
		</dl>
		<header></header>
		<section></section>
		<footer></footer>
	</body>
</html>
特性:
Semantic :
语义化网页意义和结构
SEO

本地存储特性: ===> localstorage  
APP cache 、IndexDB
localStorage

MULTIMEDIA: 多媒体
audio video等

三维、图形及特效特性:
svg canvas webGL

iconfont

浏览器层面:

webRTC ==> web realtime实时 communication

webSockets ==> socket.io ， http协议不同的

Server-Sent Event和WebSockets


新增标签：header nav footer article section aside dialog audio vedio

[参考资料](http://baike.baidu.com/link?url=fVV77B2SuvDfjAbnMVF0s0F_QWiadbf4by5xar2iEY-xpXAMw__D4U4egyGvPeiXXuial2wfguGDn6BdIZBJ7a)
-------------------------------------------------------

题目2： input 有哪些新增类型type？
type:  color / date / datetime
autocomplete
autofocus
...
[htm5新增input属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)

-------------------------------------------------------


题目3： 浏览器本地存储中 cookie 和 localStorage 有什么区别？ 
localStorage 如何存储删除数据。

3.1 同: 
origin : 域名 + 端口
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

题目4： 写出如下 CSS3效果的简单事例

    1. 圆角， 圆形
    2. div 阴影
    3. 2D 转换：放大、缩小、偏移、旋转
    4. 3D 转换：移动、旋转
    5. 背景色渐变
    6. 过渡效果
    7. 动画
[参考顾嘉诚的答案](./css3.html)    

-------------------------------------------------------

题目5： 实现如下全屏图加过渡色的效果（具体效果随意）[DEMO18](http://book.jirengu.com/jirengu-inc/js-works/css3/big-cover.html)

[参考顾嘉诚的答案](./gradient.html)    

-------------------------------------------------------


题目6： 写出如下 loading 动画效果


[loading_circle]('./loading_circle.html')

[loading_music]('./loading_music.html')



-------------------------------------------------------
总结:
CSS3:
选择器 ==>
框模型 ==> border-radius / box-shadow / border-image
背景和边框 ==> background-size / background-origin

文本效果 ==> text-shadow / word-wrap 
2D/3D 转换 ==> transform
translate(x,y) / rotate(deg) / scale(x,y) 
/ skew(xdeg,ydeg) / matrix()
/ rotateX() / rotateY()

过渡  
transition / all 1s 
transition-property transition-duration transition-timing-function transition-delay
动画
@keyframes animation
> http://www.w3school.com.cn/css3/css3_animation.asp
用户界面 box-sizing="border-box"




-------------------------------------------------------



问卷调查结果
---------------------

1.第1题：你有Html5移动端开发的经验吗  
没有

2.第2题：以下哪些是Html5规范下的内容  [多选题]

有人回答cookie，这点需要纠正

3.第3题：关于Html5，以下哪些说法是正确的  [多选题]

有人回答它是一种语言，需要纠正

4.第4题：关于移动端开发，有什么要问老师的吗？  [填空题]

4.1:实践中是都是基于框架还是媒体查询呢

4.2:如何实现多终端适配和调试的？

4.3:想问下移动端未来的发展趋势，是一种多端、资源整合的的方向吗？
    为什么微信小程序很失败

终端越来越多


4.4:移动开发和电脑端有何不同	

flexbox

4.5:上班工作中运用最多的是什么 麻烦讲一下	

flexbox, webpack + vue/react + ES6/7

4.6:求学习资源	
js:
ES6/7 ==> 了解就好

框架:
vue 1、2 ==> 根据业务场景来

移动端:
flexbox

构建工具:
webpack ==> 会用就好

科学上网

github开个账号，多follow大牛

4.7:讲一下移动端开发，您认为必须掌握的3个知识点？

vue框架
css布局 ==> flexbox + css3要熟悉
js ==> 渐渐会用ES6/7


4.8:怎么快速入门开发一个移动端网页


4.9:各种浏览器如何兼容（UC、微信浏览器、安卓ios原生浏览器），移动端开发流程、测试流程？

css层面就搞定了
==》 reset.css重置标签样式
==》 写head里面的meta属性 比如viewport
==》 定义盒模型box-sizing : border-box
==》 flexbox来处理
JS
随便用ES5的语法
html
随便

4.10:如何让页面适配各种移动设备？思路	
css
层面的问题 ==》 @media screen


4.11:
1.移动开发和PC开发有什么不同，要学什么，需要框架吗 
VUE

2.移动开发怎么测试不同的移动设备，如苹果和安卓
配备测试机


5.关于前端职业求职及规划有什么要问老师的吗

5.1:简历怎么写有点迷	
清晰 STAR ==>scenario场景 task任务 action行动 result效果 
学习能力 展现 
学习热情

面试的时候==》 nice 态度，不要太紧张

5.2:
	1、没毕业证对求职以及未来工作的影响？
	社招 能力

	2、面试官常说：“我看不到你简历的亮点”这个亮点是基于公司业务需要吗？
	

	3、前端的核心竞争力是神马
	代码能力

5.3:前端工作中html5和css3用的多吗一般用在哪些地方	

5.4:前端入门之后，深度方向怎么发展？广度方向又怎么发展？	
	Promise专家，css专家，js专家。
	知识广度(能干活) ===> 深度(专家)
	vue react
	webpack babel
	es5 es6  

5.5:面试该怎么准备，算法怎么提高	
	数组排序算法 

5.7:初级前端到中级前端需要掌握什么？
	需要别人带的开发==》 初级前端
	API层面的代码熟练度
	沟通技巧
	知识广度(能干活) ===> 深度(专家)
	可以基本独立开发==》 中级前端

5.8:前端未来的趋势	
	人越来越多，竞争越来越激烈
	中高级前端少
	终端越来越多 ==》 VR 微信小程序 微信 PC 各种手机 桌面应用 app
	全栈 ==》 前端 + Node.js


6.关于JS部分，有哪些疑问需要问老师的？

6.1: Promise 这些怎么展开学习
> 度文档 搜资料。 ES6/7 阮一峰老师ES6入门
> Node.js用的很多

6.3: JS 怎么复习最好	
> javascript语言精粹 才100页
> 写代码
> W3c ==> MDN来读文档

6.4: 处理后端给的数据方面，我只做过音乐播放器，API是饥人谷做的，
	 这点数据处理经验在实际工作中足够吗？很怕到时看不懂后端给的东西，尴尬
	 > http协议
	 > xmlhttprequest 
	 > cookie
	 > 数据库增删改查

6.5: 老师能讲下原型、原型链么
__proto___

var f = function(){
	this.a = 'a'
};
f.prototype = {
	__proto__:{
		c:1
	}
}
f.prototype.hello = function(){
	///
}

new f()

6.6: 读jquery或者vue等框架源码有什么好建议？	

<1000行的代码的库才去读

6.7: 学习JS库和框架时要怎么学习源码		 









































