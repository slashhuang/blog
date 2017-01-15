# webpack技术入门

> webpack目前基本已经成为前端项目的标配构建工具了，

> 然而，在一个前端团队里面，除了架构师之外，其他开发者很难有机会在工作中完整的实现整个配置流程。

> 本篇文章是我在公司里面分享webpack及babel配置和插件开发的一个细节版本，

> 希望能让大家通过阅读本文，比较好的梳理webpack工具。

# webpack的出现解决了什么问题

> JavaScript自面世之后，就成为浏览器的标准脚本语言。

> 然而JS本身并没有提供python和java的package包、子模块的import等语法。 

> 同时，前端代码还需要处理类似CSS、png、webfonts等非JS的文件。

> 在前端工程化大潮下，一个既能处理JS又能处理别的资源文件的加载器(bundler)亟待出现。

> webpack就是这类解决方案中的杰出代表。

> 下面，我将按照如下的目录结构进行webpack的简单讲解。

1. webpack概述

2. 一个简单而通用的webpack配置文件

3. webpack的配置文件解读及架构浅析

4. webpack常用的plugins及loader

5. webpack总结

## 1.webpack概述

> webpack = module building system。

> 在webpack看来，所有的资源文件都是*模块(module)*,只是处理的*方式*不同。

> 上面两句话就把webpack从top-level的角度讲清楚了，

> 开发者在使用webpack的时候只需要关心处理的方式,而不必纠结文件类型。

> 比如我们会在项目中使用ES6/7的语法来编写JS代码,

> 于是我们只需要配置babel-loader即可处理这种JS。

> 比如我们需要加载html文件获取html字符串,

> 于是我们只需要配置raw-loader即可拿到对应文件的字符串。

> 比如我们需要将sass/less文件预编译成css，

> 于是我们只需要配置sass-loader/less-loader即可处理。

> webpack提供了一套API接口，开发者只需要按照它提供的规范照着做就行了。

> 对于开发者来说，除了需要阅读英语文档能力和nodeJS之外，webpack的学习门槛真的不高。


## 2.一个简单而通用的webpack配置文件

> 我们看一个示例 webpack.config文件来进行分析

```javascript
var webpack = require("webpack");
var DefinePlugin = require('webpack/lib/DefinePlugin');
module.exports =  {	
		context:process.cwd(),
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
        externals: {
        	"React": "react"
    	},
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                _: 'underscore',
                React: 'react'
            }),
            new DefinePlugin({
		      'process.env': {
		        'NODE_ENV': JSON.stringify('development')
		      }
		    })
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

> 通过配置plugins、module.loaders、entry、output基本可以构建一个兼容本地开发和生产环境的富应用的web工程了。

## 3. webpack的配置文件解读及架构浅析

> 关于webpack的体系架构设计，其实和我们平时开发业务产品是一个道理。

> 产品需求 ===> 代码设计 ===> 提供API给开发者使用。

> webpack要解决的需求点就是*如何更好的加载前端模块*，

> 这里我用了*模块*二字，是因为webpack从JS出发，将所有的文件看做它要处理的*模块*。

> webpack本身并不关心这个模块是什么，它只是调度webpack.config文件中对模块处理的方式来完成这一切。

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

- resolve对象
```javascript
  resolve: {
            alias:{ jquery: path.resolve(process.cwd(),'src/lib/jquery.js')},
            extensions:['.js','.json']
        }
``` 
> resolve对象是在*webpack预编译时*，就加载进整个webpack编译的处理配置中的。
> 比如alias会将对象建立映射表,比如require('jquery')==> require('/Users/**/src/lib/jquery.js')

- plugins数组
```javascript
	/**
	比如有个文件代码中存在process.env对象，则process.env将会被替换成上面的{
	 	'NODE_ENV': JSON.stringify('development')
	}
	*/
	plugins: [new DefinePlugin({
		'process.env': {
		    'NODE_ENV': JSON.stringify('development')
		    }
		})]
```
> 关于这个配置文件，读者如果有疑问，可以直接在评论区留言，我会尽快回复，这里就不赘述了。

> 更进一步的webpack配置含义可以参考我的github博客[webpack编译流程漫谈](https://github.com/slashhuang/blog/issues/1)

## 4. webpack常用的loaders和plugins

> 关于这一点呢，其实官方已经给出非常详尽的解决方案了。

> 这里我先做个文档搬运工

[前端资源loaders列表](http://webpack.github.io/docs/loader-conventions.html)
> 关于loaders这块，直接按照它的官方说明即可。

[webpack内置的plugins列表](http://webpack.github.io/docs/list-of-plugins.html)

> 关于plugins这块，经过多个前端项目搭建实践下，笔者认为如下几款plugins是非常不错的。

1、代码优化之:

- CommonsChunkPlugin -抽取公共代码

- UglifyJsPlugin - 压缩混淆代码

2、 依赖注入之:

- DefinePlugin - 自由变量注入

- ProvidePlugin - 模块变量标示符注入

3、 文件抽取之:

- file-loader 传送font等文件

- ExtractTextPlugin 抽取css文件

4、 开发体验优化之:

- WebpackNotifierPlugin 编译完成动态通知

- HtmlWebpackPlugin 采用模板引擎形式注入到html文件，让开发更加easy

5、 目录/文件拷贝之:

- CopyWebpackPlugin 目录及文件拷贝

## 5.webpack总结

> 本篇文章对webpack的讲解主要集中在API层面，

> 但是webpack的源码结构还是很清晰的，

> 推荐有兴趣的同学去读下源码。

> 另外，关于webpack的编译流程，
> 我几个月前也写过一篇博客[webpack编译流程漫谈](https://github.com/slashhuang/blog/issues/1)供大家参考。

> 笔者之后也会在前端学习专栏撰稿，
> 欢迎大家关注[笔者](https://www.zhihu.com/people/huang-da-xian-14-14/activities)和[前端学习专栏](https://zhuanlan.zhihu.com/study-fe)。











