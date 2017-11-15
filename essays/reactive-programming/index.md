## reactive programming【介绍其一】
https://www.youtube.com/watch?v=X_RnO7KSR-4
https://github.com/tc39/proposal-observable



reactive programming算是继functional programming之后比较潮的编程理念了。

reactive programming一般具备以下几个要素:

1. event-driven
2. scalable
3. resillient
4. responsive

下面笔者将会结合个人在rxjs、redux、vuex等数据方案的实践阐述个人的理解。

## event-driven

reactive programming 的第一个要义是事件驱动 react to event。

事件驱动往往和async是挂钩的，这种none-block的程序模型对于代码并发效率提升有显著效果。
我们把数据模型的data mutation看成是事件,这种理念是可以说是`event sourcing`思想的加强版。
当然，具体的代码使用还是得和业务场景挂钩起来。

举个rxjs的例子。

```js

	//采用rx的fromEvent操作符来描述数据源驱动

	Observable.fromEvent(document,'click')
		.subscribe({next:(data)=>{
			console.log(`document clicked`)
	}})
```

## Elastic

灵活的数据处理方案。

在reactive programming的体系里，动态调节程序负载的流量是一个要求。
比如在前端领域，我们常用throttle和debounce的方式来调节用户在界面的动作，以便动态调节数据流量。

这种能力同样在rx系列框架里面有比较好的实现。

举个rxjs的例子。

```js
	//间隔1秒触发的数据，变为了2秒才能执行通知。实现数据节流
	Observable.interval(1000).throttleTime(2000)
		.subscribe({next:console.log})

```

## resillient

容错处理。

这一点在前端领域，我们有Promise的catch，也有try/catch来处理。
对于集成进一个事件驱动framework来说，这种hard code的方式绝对是不够的。
除此之外，reactive要求程序能够恢复数据流，保持程序足够的健壮和事件驱动。

举个rxjs的例子

```js
	get(url).retry(3).cacth(cacheVersion())
	    // Displays the data from the URL or cached data
		.subscribe({next:console.log})

```

## responsive

响应式 react to users

对于事件的处理是reactive programming的第一要义。
handlers能够组合、拆分等等。


### 结语

本文的话，对reactive-programming的介绍比较简略。
对于我们大部分JSER来说，了解这种编程理念的最好途径莫过于学习rxjs了。



#### 最后，广告时间。

阿里钉钉团队招资深前端开发工程师，如果您对react ＋redux技术栈有比较好的实践，请联系我。

简历投递地址: xiaogang.hxg@alibaba-inc.com。



[参考资料](http://reactivex.io/)
