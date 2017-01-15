# webpack技术入门

> webpack目前基本已经成为前端项目的标配构建工具了，
> 然而，在一个前端团队里面，除了架构师之外，其他开发者很难有机会在工作中完整的实现整个配置流程。
> 本篇文章是我在公司里面分享webpack及babel配置和插件开发的一个细节版本，
> 希望能让大家通过阅读本文，比较好的梳理webpack工具。

# webpack的出现解决了什么问题

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

# webpack华丽登场
> 下面，我按照如下的目录结构进行webpack的简单讲解。
1. webpack的能力
2. webpack的体系架构
3. 如何编写webpack的配置文件
4. webpack常用的plugins及loader
5. webpack总结

## 1.webpack的能力
> 正如我们在开头提到的一样，webpack解决的痛点之一在于*兼容不同规范的JS代码编写形式*。
> 用官方的英文说法更准确-- 'code splitting'。
> 除去JS之外，由于前端代码还存在CSS、png、webfonts等文件，
> webpack也能通过配置相关的*loader*来处理这类文件。
> 我们看一个示例 webpack.config文件
```javascript
var webpack = require("webpack");
module.exports =  {
        watch: true,
        entry: './index.js',
        devtool: 'source-map',
        output: {
            path: path.resolve(process.cwd(),'dist/'),
            filename: '[name].js'
        },
        resolve: {
            alias:{ jquery: 'src/lib/jquery.js', }
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                _: 'underscore',
                React: 'react'
            }),
            new WebpackNotifierPlugin()
        ],
        module: {
            loaders: [{
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },  {
                test: /\.less$/,
                loaders:['style-loader', 'css-loader','less-loader']
            }, {
                test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg|swf)$/,
                loader: "file-loader?name=[name]_[sha512:hash:base64:7].[ext]"
            }, {
                test: /\.html/,
                loader: "html-loader?" + JSON.stringify({minimize: false })
            } ]
        }
    };
```
> 这个简单的webpack配置文件，基本可以处理大多数的前端业务场景了。
> 具体的配置含义可以参考我的github 博客[webpack编译流程漫谈](https://github.com/slashhuang/blog/issues/1)
> 关于这个配置文件，读者如果有疑问，可以直接在评论区留言，我会尽快回复，这里就不赘述了。

## 2. webpack的体系架构

> 关于webpack的体系架构设计，其实和我们平时开发业务产品是一个道理。
> 产品需求 ===> 代码设计 ===> 提供API给开发者使用。
> webpack要解决的需求点已经在第一点上面说了，简单来说就是*如何加载前端模块*，
> 这里我用了*模块*二字，是因为webpack从JS出发，将所有的文件看做它要处理的*模块*。
> 而webpack本身并不关心这个模块是什么，它只是调度webpack.config文件中对模块处理的方式来完成这一切。
> 我们通过剖析webpack.config文件，来阐述webpack本身的处理方式。

- module.loaders数组
```javascript
	[{
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
    }]
```
> 比如有个文件require('index.jsx'),
> webpack会根据文件名是否满足test字段的正则来决定是否使用babel-loader来处理文件。
> exclude则是告诉webpack不需要对node_modules目录进行处理

- plugins数组
```javascript
	[{
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
    }]
```
> 比如有个文件require('index.jsx'),
> webpack会根据文件名是否满足test字段的正则来决定是否使用babel-loader来处理文件。
> exclude则是告诉webpack不需要对node_modules目录进行处理




















