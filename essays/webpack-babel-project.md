# 前言

> 熊猫同学借着创建node+fe新项目的机会，

> 整理了下之前采用```babel6+webpack```构建PC站和H5项目的经验总结。

> 关于IE8的兼容性问题，一直都是前端开发者的痛点。

> 之前曾经看到有阿里的同学在github上曾经发表对于babel6各种不支持IE8的一些苦恼及解决方案,

> 主要的问题原因在于ES6、commonJS在babel6导出的时候会出现一个default关键词,

> 关于ES5方法及类似Promise,Array.includes等方法，通过```shimsham.js+core-js```基本handle了，

> 所以本篇文章，我将主要针对babel6和webpack构建前端项目做个总结和分析。