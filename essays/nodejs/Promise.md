## 采用Symbol和process.nextTick实现Promise

Promise已经成为处理Node.js异步流程的标配技术。

V8的async/await语法构筑在Promise之上、处理generator的co模块基于Promise实现。

处理http请求的axios、gulp4的构建流程、主流的测试框架mocha/ava等等都围绕Promise为开发者量身打造。

Promise的核心特点在于异步流程chaining、状态存储、then/catch条件分支明确、microtask处理等等。

为了对异步流程的处理更有把控力，笔者借鉴了V8的Promise.js源码和Promise A+的开源社区的实现，

自己写了个Promise实现，在数据结构上采用了链表模拟callback queue，

在算法上面采用了process.nextTick来模拟microtask,在私有方法模拟上采用Symbol来实现。

下面我先给大家介绍下V8层面的Promise的实现，如有理解错误请在评论区指出。


## V8 Promise的实现

下载完Node.js源码后，可以看到Promise的代码位置在deps/v8/src/js/promise.js。

在同一个文件夹下面还有个macros.py文件用来定义JS数据类型层面的方法和js到C++层面的counter。

基本可以认为macros.py只是个简单的bridge和util,这边不进行特别的讨论。

打开promise.js文件，基本可以看到两块语法，一块是标准的JS语法，一块是在JS层面添加%标示C++实现的代码。

后者的话，其实就是C++在逐语句执行JS做的hook，夺取控制权而已。

整体的promise.js实现分为设置Promise的Symbol、Promise构造函数、

Promise状态从pending改变的处理逻辑和NewPromiseCapability形成Promise的数据结构。

由于是V8环境的js代码，所以promise.js实现是function的堆叠，而且部分逻辑用%做了hook,所以这不是一份适合阅读的代码。

既然理顺了要实Promise要关注的逻辑点，下面我就给大家展示下我自己写的Promise,大概是130行左右。

## 130行实现Promise的主逻辑

#### 定义数据结构

我们先看一个基本的使用形式

```javascript
	//经过100ms，改变p的状态为fulfilled、值为1
	let p = new Promise((res,rej)=>setTimeout(res,100,1));
	//100ms后，打印1,pNext状态为fulfilled、值为1
	let pNext = p.then(console.log)
```
如上是个简单的Promise使用范例。

要做到fn能够100ms后执行，p.then的作用势必只是将fn存储起来而已，

同时fn的执行时机完全由p决定。所以p和pNext基本确定肯定如下数据结构。

1. p能够拿到pNext的引用
2. pNext提供了接口给p,当p状态改变的时候执行这个接口即可。

如上是我们的基本数据结构，很典型的链表。

下面我们看下算法层面

#### 定义microtask算法

如上由于then/catch的执行是一个microtask机制，所以必须采用一个异步api来模拟这种能力。

在浏览器环境可以采用mutationObserver,在Node环境我是采用的process.nextTick。

到这边，算法和数据结构选型定的差不多了，下面开始实现Promise.


## 实现Promise

#### 定义constructor

constructor按照我们的使用习惯定义即可，executor是一个函数，参数是resolve/reject.

这里我将Promise将executor的参数resolve/reject定义在同一个namespace下面。

为了避免它能被Object.keys等读取，我们采用Symbol定义它们的方法名。

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

如上即为我们的第一步，基本上和我们平时使用Promise的经验保持了一致。

在resolve或者reject函数执行的时候，修改this的stateSymbol来标明它的状态是fulfilled还是rejected.

关于代码中的defineProperty，就是个简单的Obj[prop]=val的细致版本，为了专注主逻辑，这边不多解释。

定义完constructor和resolve/reject函数后，我们就要考虑prototype.then/catch的逻辑了。

#### 定义prototype.then和prototype.catch

then和catch要做两件事，第一件是存储microtask,另一件是如果状态不为pending要autoRun。

由于then和catch只是一个处理fulfill，一个处理reject而已，而且then如果有第二个参数也可以兼容catch的处理逻辑。

所以我把then和catch的逻辑归为一类，并定义[nextThenCatchSymbol]方法来处理。

```javascript
class SuperPromise{
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
		this.RunLater()
	}
	[rejectSymbol](error){
		defineProperty(this,stateSymbol,rejectState);
		this.PromiseVal =  error;
		this.RunLater()
	}
	[nextThenCatchSymbol](fnArr,type){
		//将then和catch方法归为一类
		let method = 'resolve';
		let resolveFn = fnArr[0];
		let rejectFn = fnArr[1];
		if(type=='catch'){
			method = 'catch';
			rejectFn = fnArr[0];
		};
		return new Promise((res,rej)=>{})
	}
	then(fn,fn1){
		return this[nextThenCatchSymbol]([fn,fn1],'resolve')
	}
	catch(fn){
		return [nextThenCatchSymbol]([fn],'reject')
	}
}

```
如上[nextThenCatchSymbol]返回了一个空的Promise，没什么用处。

回头看一开始我们定义的数据结构，必须给这个空Promise定义接口，同时还要添加microtask.

于是改造这个function如下

```javascript
[nextThenCatchSymbol](fnArr,type){
		let method = 'resolve';
		let resolveFn = fnArr[0];
		let rejectFn = fnArr[1];
		if(type=='catch'){
			method = 'catch';
			rejectFn = fnArr[0];
		};
		//返回新的Promise,pending状态
		let newPromise =  new SuperPromise((resolve,reject)=>{});
		//添加对外接口
		newPromise[resolveFnSymbol]=function(val){
			let nextValue = resolveFn(val);
			if(nextValue instanceof SuperPromise){
				nextValue.then(val=>{
					this[resolveSymbol](val)
				})
			}else{
				this[resolveSymbol](nextValue)
			}
		}
		newPromise[rejectFnSymbol]=function(val){
			let nextValue = rejectFn(val);
			if(nextValue instanceof SuperPromise){
				nextValue.catch(val=>{
					this[rejectSymbol](val)
				})
			}else{
				this[rejectSymbol](nextValue)
			}
		}
		//在上个Promise内部注册microtask
		this.microtask = {
			newPromise
		};
		//microtask异步执行
		this.RunLater();
		return newPromise

```

如上我们手动给newPromise指定了两个接口[rejectFnSymbol],[resolveFnSymbol],

我们在上个Promise实例上挂了microtask，并立即执行了Runlater。

写到这里，大部分的数据结构已经完成，接下来就是Runlater方法的实现。

```javascript
	RunLater(){
		if(!this.microtask){
			return
		}
		let state =  this[stateSymbol];
		let PromiseVal = this.PromiseVal;
		let { newPromise } = this.microtask;
		let hookFn= '';
		if(state == fulfillState || state == rejectState){
			hookFn = state == fulfillState?resolveFnSymbol:rejectFnSymbol;
			RunLater(()=>newPromise[hookFn](PromiseVal))
		}
	}

```
RunLater的逻辑很简单，就是根据当前的promise的情况来决定是执行resolve还是reject的逻辑而已。


### 阶段性总结

写到这边，大部分的逻辑都已经实现完毕。

具体的细节并不多了，但是再写下去恐怕会让大家对主逻辑混乱。

有兴趣看我的源码实现的同学可以看[Promise实现](https://github.com/slashhuang/V8-promise/blob/master/promise.js)


## 结语

对于具体的技术用文字来描述，总是缺乏可感性。

希望本文对大家理解Promise有裨益。

下面我将继续关于co,出一个自己的实现方案，欢迎关注我的知乎和专栏。

完。

















