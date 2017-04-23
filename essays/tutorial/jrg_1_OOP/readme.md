## 对象 原型实践

问题1： OOP 指什么？有哪些特性

OOP是一种编程模式，这种编程模式将数据封装成对象，采用操作对象的形式来编程。
JS是一种非常注重OOP的语言，它遵循prototype的方式而不是传统C系语言的class模型。

[OOP官方解释](https://developer.mozilla.org/en-US/docs/Glossary/OOP)

1. class定义抽象的数据模型，实例instance由类class实例化，和class具备相同的数据结构[不多也不少]。

2. JS没有类和实例的明显区分。它只有`object`对象。一个原型继承的语言有`原型对象`的概念,`原型对象`是
新对象创建时候的模板对象(template object)。一个对象可以随意控制自己的`property`方式。

[js和java构造函数对比](./assets/js_java_constructor.png)
[js和java构造函数动态性对比](./assets/js_java_flexible_constructor.png)

[面向对象采用class和prototype的区别](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Details_of_the_Object_Model#Class-based_vs._prototype-based_languages)


特性


1. Encapsulation 封装==> `private 、public method`等等
2. Composition, inheritance, and delegation (组合、继承、代理) ==> `extends 、protptye`
3. Polymorphism (多态) ==> `apple.eat() 、 banana.eat()`
4. Open recursion (使用同一个对象的其他方法)==>`this self等`

[wikipedia oop](https://en.wikipedia.org/wiki/Object-oriented_programming)



问题2： 如何通过构造函数的方式创建一个拥有属性和方法的对象? 

```js

	function Person(name,age){
	  this.name = name;
	  this.age = age
	}
	Person.prototype.slogan = function(){
	  console.log('My name is : ' + this.name);
	}
	var p = new Person('liyang',18);
	p.slogan();

```
问题3： prototype 是什么？有什么特性 

> Every JavaScript object has a prototype. 
  The prototype is also an object. 
  All JavaScript objects inherit their properties and methods from their prototype.

每一个JS对象都有原型。
原型是一个对象。
所有的JS对象都从原型链里继承属性和方法。  

1. 字面量创建对象的原型链

```js
	var o = {a: 1};
	//原型链 o ---> Object.prototype ---> null

	var b = ['yo', 'whadup', '?'];
	//原型链 b ---> Array.prototype ---> Object.prototype ---> null

	function f() {
	  return 2;
	}
	//原型链 f ---> Function.prototype ---> Object.prototype ---> null

```

2. With a constructor

```js
	var Test = function(){
        this.name = 'slashhuang'
    };
    Test.prototype = {
        bark: function() {
           alert(this.name)
         }
    };
    var inst = new Test()

	// inst is an object with own property 'name'.
	// inst的原型is the value of Test.prototype when new Test() is executed.

```

3. With Object.create

```js
	var a = {a: 1}; 
	// a ---> Object.prototype ---> null

	var b = Object.create(a);
	// b ---> a ---> Object.prototype ---> null
	console.log(b.a); // 1 (inherited)

	var c = Object.create(b);
	// c ---> b ---> a ---> Object.prototype ---> null

	var d = Object.create(null);
	// d ---> null
	console.log(d.hasOwnProperty); 
	// undefined, because d doesn't inherit from Object.prototype

```

4. With the class keyword

```js
	class Polygon {
	  constructor(height, width) {
	    this.height = height;
	    this.width = width;
	  }
	}

	class Square extends Polygon {
	  constructor(sideLength) {
	    super(sideLength, sideLength);
	  }
	  get area() {
	    return this.height * this.width;
	  }
	  set sideLength(newLength) {
	    this.height = newLength;
	    this.width = newLength;
	  }
	}

	var square = new Square(2);

```


问题4：画出如下代码的原型图

```js
	function People (name){
	  this.name = name;
	  this.sayName = function(){
	    console.log('my name is:' + this.name);
	  }
	}

	People.prototype.walk = function(){
	  console.log(this.name + ' is walking');  
	}

	var p1 = new People('饥人谷');
	var p2 = new People('前端');
```

	// p1 ---> People ---> Object.prototype ---> null
	// p2 ---> People ---> Object.prototype ---> null



问题5： 创建一个 Car 对象，拥有属性name、color、status；拥有方法run，stop，getStatus 





问题6： 创建一个 GoTop 对象，当 new 一个 GotTop 对象则会在页面上创建一个回到顶部的元素，点击页面滚动到顶部。拥有以下属性和方法

```bash
	1. `ct`属性，GoTop 对应的 DOM 元素的容器
	2. `target`属性， GoTop 对应的 DOM 元素
	3. `bindEvent` 方法， 用于绑定事件
	4  `createNode` 方法， 用于在容器内创建节点

```






