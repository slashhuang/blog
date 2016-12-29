# 前言

> 说实在的，前端发展到现在，不用个```(webpack|babel|nodeJS|typescript)```(可选)，

> 你都不好意思说这个项目具备工程化和多人协作的能力。

> 关于前端工程化的问题，业界的主流讨论点主要集中在组件规范之web-components，

> 框架引入之react、vue,构建相关之webpack、roollup、gulp,语法相关之ES6/7、typescript等方面。

> 这篇文章，我将主要针对webpack+babel来集中讨论H5/PC项目的构建。

> 下面是本文的论述小标题列表。

- babel插件及polyfill引入机制
- babel与PC痛点之IE8
- webpack给前端项目提供的便利点分析及插件体系
- typescript和ES6、7引入的利弊


# babel插件及polyfill引入机制
### 1. babel编译体系介绍

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
> 整体的babel编译大概按照如下流程进行
```js
    input string
    -> babylon parser
    -> AST
    -> babel-traverse transformer[s]
    -> AST
    -> babel-generator
    -> output string
```
> 可以看到babel插件在生成AST后，会经历一个plugin和presets的转换才会到output string，
> 很多github上开源的babel插件也是基于这个时机个性化自己的一些转换需求和babel配置的。
> 接下来我们看下babel的presets这块

2. babel presets(预置插件方式)

> Presets是一个plugin数组来描述对AST进行transform的转换关系。

> 在babel6以后的版本，默认内置的transformer都被移除了。

> babel官方本身是维护了一些比较常用的```babel-preset-es2015```等预设plugins。

> 直观的解释Presets的话，可以认为Presets是plugins的一个namespace，引入Presets即相当于引入了plugins.

> 所以，基本上可以跳过presets来看plugins

3. babel plugins(插件)

> 开文先抛观点: 插件是babel的核心!!

> 一个基本的babel插件可以分为transform插件和syntax插件。


#### babel总结

> 关于babel更多的知识，直接参考babel的handbook基本可以handle了。

> 对于没有特殊要求的前端项目而言，我的建议是直接写个.babelrc配置给babel阅读即可。


# babel与PC痛点IE8

> 参考我写的配置
[babel-preset-es2015-ie8](https://github.com/slashhuang/babel-preset-es2015-ie8/tree/master)

> 关于IE8的兼容性问题，一直都是前端开发者的痛点。

> 之前曾经看到有阿里的同学在github上曾经发表对于babel6各种不支持IE8的一些苦恼及解决方案,

> 主要的问题原因在于ES6、commonJS在babel6导出的时候会出现一个default关键词,

> 关于ES5方法及类似Promise,Array.includes等方法，通过```shimsham.js+core-js```基本handle了，

> 所以本篇文章，我将主要针对babel6和webpack构建前端项目做个总结和分析