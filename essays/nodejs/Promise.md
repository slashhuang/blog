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

#### 定义数据结构

> 我们先看一个基本的使用形式

```javascript
	//经过100ms，改变p的状态为fulfilled、值为1
	let p = new Promise((res,rej)=>setTimeout(res,100,1));
	//100ms后，打印1,pNext状态为fulfilled、值为1
	let pNext = p.then(console.log)
```
> 如上是个简单的Promise使用范例。

> 要做到fn能够100ms后执行，p.then的作用势必只是将fn存储起来而已，

> 同时fn的执行时机完全由p决定。所以p和pNext基本确定肯定如下数据结构。

> 1. p能够拿到pNext的引用
> 2. pNext提供了接口给p,当p状态改变的时候执行这个接口即可。

> 如上是我们的基本数据结构，很典型的链表。

> 下面我们看下算法层面

#### 定义microtask算法

> 如上由于then/catch的执行是一个microtask机制，所以必须采用一个异步api来模拟这种能力。

> 在浏览器环境可以采用mutationObserver,在Node环境我是采用的process.nextTick。

> 到这边，算法和数据结构选型定的差不多了，下面开始实现Promise.


## 实现Promise

#### 定义constructor

> constructor按照我们的使用习惯定义即可，executor是一个函数，参数是resolve/reject.

> 这里我将Promise将executor的参数resolve/reject定义在同一个namespace下面。

> 为了避免它能被Object.keys等读取，我们采用Symbol定义它们的方法名。

```javascript

	class Promise{
		constructor(executor){
			if(typeof executor!=='function'){
				throw new TypeError(`${executor} is not a function`)
			};
			let resolveFn = val=>this[resolveSymbol](val);
			let rejectFn = error=>this[rejectSymbol](error);
			defineProperty(this,stateSymbol,pendingState)
			try{
				executor(resolveFn,resolveFn)
			}catch(err){
				rejectFn(err)
			}
		}
		[resolveSymbol](val){
			defineProperty(this,stateSymbol,fulfillState);
			this.PromiseVal =  val;
		}
		[rejectSymbol](error){
			defineProperty(this,stateSymbol,rejectState);
			this.PromiseVal =  error;
		}
	}

```

> 如上即为我们的第一步，基本上和我们平时使用Promise的经验保持了一致。

> 在resolve或者reject函数执行的时候，修改this的stateSymbol来标明它的状态是fulfilled还是rejected.

> 关于代码中的defineProperty，就是个简单的Obj[prop]=val的细致版本，为了专注主逻辑，这边不多解释。

> 定义完constructor和resolve/reject函数后，我们就要考虑prototype.then/catch的逻辑了。

#### 定义prototype.then和prototype.catch
















