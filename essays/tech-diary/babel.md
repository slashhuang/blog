# 前言

说实在的，前端发展到现在，不用个```(webpack|babel|nodeJS|typescript)```(可选)，

你都不好意思说这个项目具备工程化和多人协作的能力。

关于前端工程化的问题，业界的主流讨论点主要集中在组件规范之web-components，

框架引入之react、vue,构建相关之webpack、roollup、gulp,语法相关之ES6/7、typescript等方面。

由于对于现在的前端开发而言，每个讨论点都可以讲非常多的东西。

为了提高文章的质量，我就主要针对构建相关中的babel来展开讨论。

本文关于babel的论述主要分为下面几块:

1. babel编译体系介绍
2. babel插件及预设
3. babel-register在gulp和node项目中的使用
4. babel的polyfill引入机制
5. 在babel升级到6时，如何兼容babel5针对ES6/7的编译方式
6. babel总结

## 1.babel编译体系介绍

1.核心包
```js
     //主入口:集成babylon babel-traverse babel-generator暴露babel.transform方法来编译source code
     babel-core
     //语法字符串解析parser
     babylon
     //结合plugins和presets(plugins)遍历AST语法树
     babel-traverse
     //生成最后的编译字符串
     babel-generator
```
整体的babel编译大概按照如下流程进行
```js
    input string
    -> babylon parser
    -> AST
    -> babel-traverse transformer[s] //结合plugins和presets(plugins)遍历AST语法树
    -> AST
    -> babel-generator
    -> output string
```
> 可以看到babel插件在生成AST后，会经历一个plugin和presets的转换才会到output string，
> 很多github上开源的babel插件也是基于这个时机个性化自己的一些转换需求和babel配置的。
> 接下来我们看下babel的presets和plugins这块

## 2.babel插件及预设presets(预置插件方式)

Presets是一个plugin数组来描述对AST进行transform的转换关系。

在babel6以后的版本，默认内置的transformer都被移除了。

babel官方本身是维护了一些比较常用的```babel-preset-es2015```等预设plugins。

直观的解释Presets的话，可以认为Presets是plugins的一个namespace，引入Presets即相当于引入了plugins,因此可以基本认为插件是babel的核心!!

由于```babylon```阶段已经将源代码预先为AST树了，

所以，大部分的插件工作只需要遵循AST tree数据结构的那一套逻辑，即可完成AST节点的个性化。

具体的实践可以直接查看官方的[plugin编写文档](https://github.com/thejameskyle/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)

## 3.babel-register在gulp和node项目中的使用

babel-register的设计思想非常厉害，简单的来说就一点就是```require hook```。

通过修改require function，对所有的通过require引入的代码先经过babel编译一遍，再给到runtime执行。

由于开发者更喜欢用ES6/7的语法来写代码，因此babel-register在nodejs环境下越来越得到各大技术宗派的喜爱。

比如gulp4的插件编写就内置了babel-register，koa2也推崇采用babel-register来编译用ES6/7写成的代码。


## 4.babel的polyfill引入机制

babel的polyfill这块是基于core-js的，像类似Promise对象、Array.includes等ES6/7方法，都可以在core-js中找到实现。

所以我的个人建议是按需引入core-js的模块而不是整个babel-polyfill bundle，来对ES6/7新增的数据对象和方法做polyfill。

## 5.在babel升级到6时，如何兼容babel5针对ES6/7的编译方式

好吧，关于babel5 babel6社区确实有很多吐槽,主要有如下几个改动的点。

1. 本来babel5的大锅饭配置模式变成了babel6的按需添加插件的形式。

2. 本来babel5对export default的输出形式在babel6下会出现default关键字。

由于以上两点的存在，导致很多基于babel5的项目升级成babel6后存在不兼容的情况。

其实，在了解了babel的compile system后，以上的两个问题是很容易解决的。

比如babel-plugin-add-module-exports这个库就可以完美解决export default 问题。

比如我写的[babel-preset-es2015-ie8](https://github.com/slashhuang/babel-preset-es2015-ie8/tree/master)即可顾虑关键字而解决IE8项目的集成。

最后，对于没有特殊要求的前端项目而言，我的建议是直接写个.babelrc来配置babel的编译方式。

#### babel总结

babel的出现让开发者可以自由的采用ES6/7的语法来编写JS项目，极大的丰富了开发层面的JS语言特性。

babel的AST parser、polyfill、 register一起完成了babel体系对JS的完备解决方案。

关于babel更多的知识，大家如果有兴趣的话直接参考[babel的handbook]((https://github.com/thejameskyle/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md))。


最后，本文首发于作者的[github blog](https://github.com/slashhuang/blog)

#### 参考资料
[plugin-handbook](https://github.com/thejameskyle/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)
[user-guide](https://github.com/thejameskyle/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md)
