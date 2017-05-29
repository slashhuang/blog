# npm_npmscript_webpack_node应用

[高级5课前问卷地址](https://sojump.com/jq/12187379.aspx)

##课程任务

### 题目1： 如何全局安装一个 node 应用?

npm install -g <packagename>

### 题目2： package.json 清单文件 bower.json  manifest.json 有什么作用？

npm ==> node package manager
> 配合npm使用，用来定义模块包，主要包括以下几点:

> 定义模块包的依赖管理[devDependencies/dependencies]、

> 定义包的基本描述信息[description、name、version等]

> 定义包的使用方式[npm scripts]

> 定义包的主程序入口模块标示[main]

> 定义包的可执行文件地址[bin]

> 定义包的bug、people、issue、license等其他信息

[npm官方对package.json的描述](https://docs.npmjs.com/files/package.json)


## 题目3： npm install --save app 与 npm install --save-dev app有什么区别?

相同点:

> 都会在项目的node_modules目录下安装app

不同点:

> package.json增量写入依赖的时候，

> 分别是在dependencies和devDependencies字段下，添加app:"版本号"。

> npm install will install both "dependencies" and "devDependencies"
> npm install --production will only install "dependencies"
> npm install --dev will only install "devDependencies"

## 题目4： nodule_modules的查找路径是怎样的?

> 如果require('模块id'),这个模块id不是nodejs的核心模块(比如http/path等)

> 并且模块标示不以路径开始('.,../,/')

> 则nodejs会不断的在上一级目录递归查找node_modules目录

> 如果查找完所有的module.paths数组，都找不到改模块id，则抛错

[nodejs官方说明](https://nodejs.org/api/modules.html#modules_loading_from_node_modules_folders)

## 题目5： npm3与 npm2相比有什么改进？yarn和 npm 相比有什么优势? (选做## 题目)
a
|- a1
|- a2

b
|- a1
|- b2

npm install a b --save-dev
node_modules  npm2时代
|- a
|- |- a1
|- |- a2
|
|- b
|- |- a1
|- |- b2

npm3改进 flattern
|— a 
|- a1
|- a2
|- b
|- b2 
> npm3和npm2在安装模块的时候，策略上前者优于后者。

> npm2是纯粹的不共享包原则。

> npm3的优化点在于对于以字母序安装npm包的时候，优先安装在node_modules第一层级目录。

> 这样做的好处是如果后续包有相关依赖则不需要重复安装。

[yarn versus npm](https://www.sitepoint.com/yarn-vs-npm/)

## 题目6： 使用 webpack 替换 入门-任务15中模块化使用的 requriejs

[参见webpack_require目录示例代码](./webpack_require)


## 题目7： 开发一个 node 命令行天气应用用于查询用户当前所在城市的天气,发布到 npm 上去。可以通过如下方式安装使用(可使用api.jirengu.com里提供的查询天气接口)

命令集合

```bash
	# 首次
	npm adduser 
	# 登录
	npm login
	# 发布包
	npm publish 
	# 发布patch代码
	npm version patch
```

[参见node-weather目录示例代码](./node-weather)

[npm包发布官方说明](https://docs.npmjs.com/getting-started/publishing-npm-packages)







