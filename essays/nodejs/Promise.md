## 采用Symbol和process.nextTick实现Promise

> Promise已经成为处理Node.js异步流程的标配技术。

> V8的async/await语法构筑在Promise之上、处理generator的co模块基于Promise实现。

> 处理http请求的axios、gulp4的构建流程、主流的测试框架mocha/ava等等都围绕Promise为开发者量身打造。

> Promise的核心特点在于异步流程chaining、状态存储、then/catch条件分支明确、microtask处理等等。

> 为了对异步流程的处理更有把控力，笔者借鉴了V8的Promise.js源码和Promise A+的开源社区的实现，

> 自己写了个Promise实现，在数据结构上采用了链表模拟callback queue，

> 在算法上面采用了process.nextTick来模拟microtask,在私有方法模拟上采用Symbol来实现。

> 下面我先给大家介绍下V8层面的Promise的实现，如有理解错误请在评论区指出。


## V8 Promise的实现

> 下载完Node.js源码后，可以看到Promise的代码位置在deps/v8/src/js/promise.js。

> 在同一个文件夹下面还有个macros.py文件用来定义JS数据类型层面的方法和js到C++层面的counter。

> 基本可以认为macros.py只是个简单的bridge和util,这边不进行特别的讨论。

> 打开promise.js文件，基本可以看到两块语法，一块是标准的JS语法，一块是在JS层面添加%标示C++实现的代码。

> 后者的话，其实就是C++在逐语句执行JS做的hook，夺取控制权而已。

> 整体的promise.js实现分为设置Promise的Symbol、Promise构造函数、

> Promise状态从pending改变的处理逻辑和NewPromiseCapability形成Promise的数据结构。

> 由于是V8环境的js代码，所以promise.js实现是function的堆叠，而且部分逻辑用%做了hook,所以这不是一份适合阅读的代码。

> 既然理顺了要实Promise要关注的逻辑点，下面我就给大家展示下我自己写的Promise,大概是130行左右。

## 130行实现Promise的主逻辑



















