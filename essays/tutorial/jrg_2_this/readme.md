## this_原型链_继承

### 1. this 相关问题

问题1： apply、call 、bind有什么作用，什么区别

---apply和call---: 动态设定函数执行时候的this和arguments数组
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
	john.sayHi()

```

问题3： 下面代码输出什么，为什么

```js

	func() 
	function func() { 
	  alert(this)
	}
```

问题4：下面代码输出什么

```js
	document.addEventListener('click', function(e){
    console.log(this);
    setTimeout(function(){
	        console.log(this);
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
	func.call(john)
	
```

问题6： 以下代码有什么问题，如何修改

```js
	
	var module= {
	  bind: function(){
	    $btn.on('click', function(){
	      console.log(this) //this指什么
	      this.showMsg();
	    })
	  },
	  
	  showMsg: function(){
	    console.log('饥人谷');
	  }
	}
	
```

### 2. 原型链相关问题

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

> The instanceof operator tests whether an object in its prototype chain has the prototype property of a constructor.
一个对象的原型链中是否存在 B.prototype

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

- 优化代码结构
- 优化内存空间

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

> The Object.create() method creates a new object with the specified prototype object and properties.

[mdn object.create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

使用方式: Object.create(proto[, propertiesObject])

兼容性: IE9 ES5


问题14： hasOwnProperty有什么作用？ 如何使用？

> The hasOwnProperty() method returns a boolean indicating 
 whether the object has the specified property 
 as own (not inherited) property.

使用方式: obj.hasOwnProperty(prop)
[hasownproperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)

问题15：如下代码中call的作用是什么?

```js
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
	function Person(name, sex){
	    // todo ...
	}

	Person.prototype.getName = function(){
	    // todo ...
	};    

	function Male(name, sex, age){
	   //todo ...
	}

	//todo ...
	Male.prototype.getAge = function(){
	    //todo ...
	};

	var ruoyu = new Male('若愚', '男', 27);
	ruoyu.printName();

```











