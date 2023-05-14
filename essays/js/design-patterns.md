# JS设计模式漫谈

> 在编写JS和组装代码的过程中，运用一定的设计模式可以让我们的代码更加优雅、灵活。

> 下面笔者就结合诸如redux的subsscribe、ES6的class、vue里面的$dispatch、jquery里面的on/off来给大家简单介绍下设计模式在这些库、语法和框架中的使用。

## 设计模式解决的问题

> 设计模式并不是很玄乎的知识，很多同学在编写JS代码的时候已经在不经意间用了不少设计模式了。

> 笔者认为把设计模式单独抽象出来探讨，就和算法中抽象出来冒泡、排序一样，是为了描述一种常用的JS pattern。

> 通过研习这类pattern，让模式来指导我们的代码结构及JS算法。

## 一些常用的设计模式概述

1. observer [观察者模式]

> 根据状态的变化主动触发观察者队列、hashMap的回调行为

> 一个简单的观察者模式代码实践

```javascript
	class StateTracker{
		constructor(){
			this.observers = [];
			this.internamState= 10;
		}
		// 改变内部状态，触发状态的观察者列表
		change(val){
			this.internamState= val;
			this.observers.forEach(observer=>observer(val));
		}
		registerObserver(ObserverFn){
			this.obserers.push(ObserverFn)
		}
	}
```

2. publish/subscribe [订阅发布模式]

> 在代码模块的共享访问空间存储hashMap的topic/callback形式。

> 添加on/off/trigger等接口实现挂载、移除、触发等动作。

> 一个简单的订阅发布模式代码实践

```javascript
	class PubSubHandler{
		constructor(){
			this.eventPool = {};
		}
		//移除
		off(topicName){
			delete this.eventPool[topicName]
		}
		//发布
		trigger(topicName,...args){
			this.eventPool[topicName] && 
			this.eventPool[topicName].forEach(callback=>callback(...args));
		}
		//订阅
		on(topicName,callback){
			let topic = this.eventPool[topicName] ;
			if(!topic){
 				this.eventPool[topicName] =[]
			}
			this.eventPool[topicName].push(callback)
		}
	}
```

3. singleton[单例模式]

> 构造函数的实例只有一个，一般是通过闭包存储内部实例，通过接口访问内部实例。

```javascript
	var singleton = ()=>{
		var instance;
		var createInstance = ()=>{
			return {a: 1, b: 2}
		}
		return {
			getInstance:()=>{
				if(!instance){
					instance = createInstance();
				}
				return instance;
			}
		}
	}
	var test = singleton();
	test.getInstance() == test.getInstance() //true
	console.log(test.getInstance()) // {a: 1, b; 2}
```

4. decorator混合模式

> 这个模式就是在原有的对象上面装饰更多行为，并且保持变量名不变。
> 用过ES7的@decorator或者python等语言的，应该对decorator不陌生的。

```javascript
	function decorator(sourceObj,decortorFn){
		decortorFn(sourceObj);
		return sourceObj
	}
	var d = {a:1};
	// d变为了{a:1,b:1}
	d = decorator(d,(d)=>{d.b=1});
```

5. mixin混合模式

> 这个模式和decorator有点类似，只是它的功能更加垂直。
> 就是在原有的对象上面增加、覆盖对象的行为。
> 相比于extends、Object.assign等方法，mixin模式更富有表现力。
> mixin模式不能一概而论，可能依据不同的数据类型有不同的mixin策略，比如vue.mixin

```javascript
	class StateTracker{
		constructor(){
			this.raw = {
				a:1,
				b:2
			}
		}
		mixin(obj){
			Object.assign(this.raw,obj)
		}
	}
```

> 笔者就暂时先介绍这么多设计模式，下面就针对常用的框架、语法、库等来说明这些设计模式的应用。


## observer模式在redux中的使用

```javascript
	var store = createStore(reducer,initialState);
	//注册redux store，存储在 nextListeners数组
	var test = store.subscribe(()=>{console.log('我注册了！')});
	// 取消注册监听
	test.unsubscribe();
```
## publish/subscribe在jquery中的使用

```javascript
	$(document).on('hello',()=>{console.log('hello')})
	$(document).trigger('hello');
	$(document).off('hello')
```

## decorator模式在react-redux中的实践

```javascript
	//装饰器
	@connect(state=>state)
	class Container extends Component{
		render(){
			return JSON.stringify(this.props)	
		}
	}
```

# 总结

> 关于设计模式在前端框架或库的实践，我这边写的是比较简略的。
> 可能没有写过相关代码的同学不是特别好理解。
> 总之，在读完本文后，大家对设计模式的概念有所了解和帮助，我就觉得已经达到目的了。

> 本文首发于笔者的github blog 












