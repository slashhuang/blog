# gulp和webpack插件编写
> 这段时间一直在调研react-native和android项目的集成工作，被公司主app的gradle配置坑的有点狠，终于在今天稍微有点闲下来了。
> 前段时间做了公司H5、PC代码发布的简易gulp+webpack插件，觉得还是有必要记录下一些开发心得。

## gulp插件前言 
> gulp定位是stream building system,像这种主流的构建工具，要想在圈内建立足够的影响力，
> 必须建立足够好的开发者生态。而要想让开发者采用统一的方式参与gulp插件的编写，那规范的指定是一件必须做的事情。
> gulp目前的稳定版本是3.9.1，同时，部分的实验特性也已经在4.0上面开发了很久了。
> 我们就以3.9.1为例子来展开讨论。

## 编写gulp插件
1. 基本原则
> 当你的插件采用nodeJS模块就可以轻易完成的时候，没必要写插件，比如删除一个文件之类的
> 比较好的形式是类似gulp-babel/gulp-coffee这类本身具备很好的功能，通过gulp插件体系就可以使得工作流更加顺畅。


## 参考资料
[buffer](https://github.com/slashhuang/node/blob/master/doc/api/buffer.md)
[gulp](https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/guidelines.md)

