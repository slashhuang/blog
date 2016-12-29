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
### 1.babel编译体系介绍

- 核心包
```
 babel-core
 babylon
 babel-traverse
 babel-generator

```


>


# babel与PC痛点IE8

> 关于IE8的兼容性问题，一直都是前端开发者的痛点。

> 之前曾经看到有阿里的同学在github上曾经发表对于babel6各种不支持IE8的一些苦恼及解决方案,

> 主要的问题原因在于ES6、commonJS在babel6导出的时候会出现一个default关键词,

> 关于ES5方法及类似Promise,Array.includes等方法，通过```shimsham.js+core-js```基本handle了，

> 所以本篇文章，我将主要针对babel6和webpack构建前端项目做个总结和分析