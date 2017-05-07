## this_原型链_继承

### 1. this 相关问题

function s(){
	this.a='a'
} 
1. arguments 参数数组
2. this指向
3. return 的值

this的指向问题4种情况 ==> 函数调用绑在一起的

1. 构造函数调用

new S() ==>this指向创建的对象本身 {a:'a'}

2. 方法调用 method,property

var p = {
	s:function(){
		console.log(this)
	}
}
p.s() ==> this指向调用方

3. apply、call的调用

p.s.call({a:2},1,2,3)
p.s.apply({a:2},[1,2,3])

4. 函数调用

var cache = p.s;
cache()==> this指向全局对象
p.s() ==> this指向P


问题1： apply、call 、bind有什么作用，什么区别

---apply和call---: 
1.动态设定函数执行时候的this
2.设定arguments数组

---bind---: 预设函数的this和部分参数


问题2:  以下代码输出什么?

```js

	var john = { 
	  firstName: "John" 
	}
	function func() { 
	  alert(this.firstName + ": hi!")
	}
	john.sayHi = func
	john.sayHi() ==>方法调用

```

问题3： 下面代码输出什么，为什么

```js

	func() 
	function func() { 
	  alert(this)
	} //函数调用==> 全局对象
```

问题4：下面代码输出什么

```js
	document.addEventListener('click', function(e){
    console.log(this); //指向document
    setTimeout(function(){
	        console.log(this); //函数调用=>指向全局对象
	    }, 200);
	}, false);
	
```

问题5：下面代码输出什么，why

```js
	var john = { 
	  firstName: "John" 
	}

	function func() { 
	  alert( this.firstName )
	}
	func.call(john) //apply、call调用,this指向apply、call的第一个参数
	
```

问题6： 以下代码有什么问题，如何修改

```js
	
	var module= {
	  bind: function(){
	  	var that =this;
	    $btn.on('click', function(){
	      console.log(this) //this指什么
	      that.showMsg();
	    })
	  },
	  
	  showMsg: function(){
	    console.log('饥人谷');
	  }
	}
	
```

### 2. 原型链相关问题

prototype 原型

问题7：有如下代码，解释Person、 prototype、__proto__、p、constructor之间的关联。

```js

	function Person(name){
	    this.name = name;
	}
	Person.prototype.sayName = function(){
	    console.log('My name is :' + this.name);
	}
	var p = new Person("若愚")
	p.sayName();

```

问题8： 上例中，对对象 p可以这样调用 p.toString()。toString是哪里来的? 
		画出原型图?并解释什么是原型链。

问题9：对String做扩展，实现如下方式获取字符串中频率最高的字符

```js

	var str = 'ahbbccdeddddfg';
	var ch = str.getMostOften();
	console.log(ch); //d , 因为d 出现了5次

```

问题10： instanceOf有什么作用？内部逻辑是如何实现的？

A instanceof B

> The instanceof operator tests whether an object 
> in its prototype chain has the prototype property of a constructor.
A的的原型链中是否存在 B.prototype


```js
	var s = {}
	s instanceof Object
```

```js
	function isInstanceOf(obj, fn){
	    var proto = obj.__proto__
	    var result = false
	    do{
	        if(proto === fn.prototype){
	            result = true
	            breark
	        }else {
	            proto = proto.__proto__;
	        }
	    }while(proto)
	    return result
	}

```

番外:终极大法判断数据类型
> Object.prototype.toString.call('333')


## 3.继承相关问题


问题11：继承有什么作用?


```js
	class A extends B{
		//A继承B
	}
	但是JS里面的话class语法并不是所有的都支持

	用prototype来实现继承
	A.prototype = B ==>让A的实例继承B的属性、方法等
```

```js
	Male extends Human
	- 优化代码结构和对象关系

	用ptototype来实现的话还可以
	- 优化内存空间
````


```js
	Person、 prototype、proto、p、constructor之间的关联不懂。。很迷糊。

	Person 是一个函数
	var s = new Person() ==> 构造函数调用
	//实例的原型链，用__proto__来指向 ==>构造函数的prototype
	s.__proto__ ==> Person.prototype

	__proto__  是key ==>prototype 是value



```

[mdn继承文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

问题12： 下面两种写法有什么区别?

```js

	//方法1
	function People(name, sex){
	    this.name = name;
	    this.sex = sex;
	    this.printName = function(){
	        console.log(this.name);
	    }
	}
	var p1 = new People('饥人谷', 2)

	//方法2
	function Person(name, sex){
	    this.name = name;
	    this.sex = sex;
	}

	Person.prototype.printName = function(){
	    console.log(this.name);
	}
	var p1 = new Person('若愚', 27);

```
问题13： Object.create 有什么作用？兼容性如何？

> The Object.create() method creates a new object with 
> the specified prototype object and properties.

```js
	- Object.create作用
	- 创建一个新的对象
	- 第一层原型链指向对应的参数
	var s = {a:1}
	var p = Object.create(s)
	==> {} __proto__:{a:1} __proto__ Object.prototype
```


[mdn object.create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

使用方式: Object.create(proto[, propertiesObject])

兼容性: IE9 ES5


问题14： hasOwnProperty有什么作用？ 如何使用？

> The hasOwnProperty() method returns a boolean indicating 
 whether the object has the specified property 
 as own (not inherited) property.

 ```js

 	var s = {a:1}
 	s.hasownproperty('a') //true
 	s.hasownproperty('toString') //false
 	//检查该属性是否是 自有属性(不在原型连里面)

 ```

使用方式: obj.hasOwnProperty(prop)
[hasownproperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)

问题15：如下代码中call的作用是什么?

```js
	//问题15：如下代码中call的作用是什么?

	function Person(name, sex){
	    this.name = name;
	    this.sex = sex;
	}
	function Male(name, sex, age){
	    Person.call(this, name, sex);    //这里的 call 有什么作用
	    this.age = age;
	}
```

问题16： 补全代码，实现继承 

```js
	// 补全代码，实现继承 
	function Person(name, sex){
	    // todo ...
	}

	Person.prototype.printName = function(){
	  	 console.log(this.name)  
	};    

	function Male(name, sex, age){
	   this.name = name
	   this.sex = sex
	   this.age = age
	}

	//继承 ==> 简单来说 构造函数的prototype指向某一个 需要的继承的对象即可
	Male.prototype = new Person()

	var ruoyu = new Male('若愚', '男', 27);
	ruoyu.printName();

```











