## 12行代码构建一个简单的静态服务器

## 前言

> 在Node.js的api文档中，几乎随处可见的是events、class、extends字样。

> 比如stream都是EventEmitter的实例，因此具备addListener、on、emit、listeners等方法。

> fs模块的createReadStream、createWriteStream都继承自stream。

> 因此具备write、end等方法。

> 理解了这一点后，我们看待Node.js层面的API就会非常清晰了。

> 我们利用stream的思想来构建一个简单的静态服务器

## http模块的request和response对象

> request和response对象实都实现了Writable Stream的接口

> 比如pipe这个方法，实际上封装了stream的'data'、"end"、drain等事件。

> 使用pipe这个api，可以以最大的效率完成file的IO。

> 下面的这个简单静态服务器，就采用了pipe来让资源以stream的形式传输给前端。

## 下面贴出代码

```javascript
    var http =require('http');
    var fs =require('fs');
    http.createServer((req,res)=>{
        let path ="."+req.url;
        fs.access(path,fs.constants.R_OK,(err)=>{
            if(err){
                res.end(`${path} 找不到文件`)
            }else{
               fs.createReadStream(path).pipe(res);
            }
        })
    }).listen(7000)
```

> 用了pipe这个接口后，整个代码逻辑就相对清晰很多了。

## 结语

> 在Node.js中，stream和eventEmitter的概念几乎遍布它暴露的api中。

> Node.js采用的异步IO的模型要求了它在建模上会采取eventLoop的机制。

> stream流则是eventEmitter的最佳实践。

> 最后，值得一提的是对于目前的Node.js应用来说，Promise的实践已经

> 内嵌入很多V8支持的语法，写Node.js目测已经必须掌握Promise了。


[静态服务器源代码地址](https://github.com/slashhuang/static-server/blob/master/index.js)

[一个Promise版本的fs模块封装](https://github.com/slashhuang/fs-pipe)



