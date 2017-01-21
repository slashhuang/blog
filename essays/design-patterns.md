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
		change(val){
			this.internamState= val;
			this.observers.forEach(observer=>observer(val));
		}
		registerObserver(ObserverFn){
			this.obserers.push(ObserverFn)
		}
	}

```