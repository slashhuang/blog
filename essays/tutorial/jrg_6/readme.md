# 前端设计模式作业答案

1. 写出 构造函数模式、constructor new
	工厂模式、factory
	混合模式、mixin
	模块模式、module 
	
	单例模式、singleton
	发布订阅模式的范例。 publish/subscibe

2. 使用发布订阅模式写一个事件管理器，可以实现如下方式调用


## 代码

1. 构造函数
  
function Person(name, age){
  this.name = name;
  this.age = age;
}
Person.prototype.sayName = function(){
  return this.name;
};
var student = new Person("若愚", 30);
var student1 = new Person("slash", 30);
// student1.__proto__ ==== student.__proto__  = true
name : 若愚，
age: 30
| __proto__
      |-- sayName : fn

name : slash,
age: 30
| __proto__
      |-- sayName : fn      

// 对象字面量
var s = {
  name: "ruoyu"
};
var s2 = s1 = s;
s2.name ='1';
s1.name = '2';
// XXX.prototype ===> 模板对象
// 通过工厂函数 
var factory = function (name) {
  return {
    name: name,
    getName: function(){

    }
  }
}
var s2 = factory('hello world');
var s3 = factory('d22')
s2 !== s3  && s3! ==s1 = true
// 栈 stack    heap堆
// 基本数据类型 int string number + 引用数据类型 object{ function , Date, Array}等
// var s1 = factory('ruoyu')
// var s2 = s1; // s2 和 s1 ===> 指向同一个内存heap地址
// s2.name ='hello world'; // ===> 改变 内存地址中的数据
// console.log(s1.name) //  ?



-------------------------------------------------


2. 工厂模式

function createPerson(name){
     var person = {
       name: name,
       sayName: function(){
       		console.log(this.name);
     	}
     };
     return person;
};
// 开辟新内存

createPerson('jirengu')
createPerson('jdjid')


-------------------------------------------------


3. 单例模式 singleton单例
// 匿名函数 
var People = (function(){
    var instance;
    function init(name) {
        return {
        	name:name
        };
    }; //词法作用域
    return {
        createPeople: function(name) {
            if (!instance) {
                instance = init(name);
            }
            return instance;
        }
    };
}());

People.createPeople('jirengu') === People.createPeople('hello') //true
//{name:'jirengu'} {name:'jirengu'}


-------------------------------------------------


4. 混合模式 mixin  ==> 实现继承
// 实例1js
var Person = function(name, age) {
    this.name = name;
    this.age = age;
};
Person.prototype.sayName = function(){
  console.log(this.name);
}

var Student = function(name, age,  score) {
  // 实例属性实现继承
    Person.call(this, name, age);
    this.score = score;
};
// 将Person.prototype挂在Student.prototype的原型链第一层
// 原型链实现继承
Student.prototype = Object.create(Person.prototype);
Student.prototype.getName = function () {
  return this.name;
}

new Student() ==> // {name :'',age:'',score:''}



-------------------------------------------------


5. 模块模式

//通过闭包，实现作用域的隔离来实现一个模块
var Person = (function(){
	var name = 'ruoyu';
	function sayName(){
		console.log(name);
	};// 词法作用域
	return {
		name: name,
		sayName: sayName
	}
})();
name = 'hello world'


-------------------------------------------------


6. 订阅发布模式 subscribe publish
$('.btn').on('click', function(event){
  console.log('clicked')
}); 
===> {  'click': [fn]   }

$('.btn').on('mouseover', function(event) {
  // console.log('clicked')
  $('.btn').trigger('click',event);
  ====> [fn].forEach(fn(event));
})
// pub/sub



var EventCenter = (function(){
  //我们如何去实现
  var F = function() {
    this.eventPool = {}; 
  };
  F.prototype.on = function(name, callback) {
    if(!this.eventPool[name]){
      this.eventPool[name] = [];
    }
    this.eventPool[name].push(callback);
  };
  F.prototype.trigger = function (name) {
    if(!this.eventPool[name]){
      this.eventPool[name] = [];
    }
    this.eventPool[name].forEach(function(fn){
      fn()
    })
  };
  return F;
}());

var e = new EventCenter();
e.on('hello',function () {
  console.log('hello')
}); 
===> 存 {'hello': [fn]}
e.trigger('hello'); // hello
===> 取后执行

 
7. 观察者模式 observer

$('input').change(function(){
   $('input').observers.forEach(function(observer) {
     observer();
   })
})
$('input').observers = []
$('input').subscribe = function(fn) {
    this.observers.push(fn);
};

// API使用方式
$('.input').subscribe(fn) ==> 记录日志
$('input').subscribe(fn1) ==> 发起请求
$('input').subscribe(fn2) ==> 改变UI




--------------------------------------

第1题：你在平时的项目开发中，有意的去实践设计模式吗？  

暂时都比较弱

第2题：你知道什么是publish/subscribe设计模式吗 

不是特别清楚

第3题：vue、react这类框架，你有学习过吗 

仅使用过vue


第4题：ES6/7有实践经验吗

大部分人没有概念

5.学习到高级6，对技术上有什么困惑需要老师进一步讲解的？

	感觉都是很高大上的东西，但是实践中却没有用到过	
2	2月25日 14:18	nodejs了解得不够多	
6	2月25日 14:29	ES6 有哪些重要的以后频繁用到的新东西，讲一讲	
8	2月25日 16:52	还在高级3


6.关于未来的前端学习，有哪些技术希望老师专门讲解的？

	node、react以及MVC等设计模式	
2	2月25日 14:18	nodejs	
4	2月25日 14:23	用户从登陆，然后拥有权限的一个流程，比如我登录了饥人谷，然后就能看视频，这个前端到后端的流程是什么样子的，前端需要干些什么事情	
6	2月25日 14:29	老师有没有什么好的学习习惯 跟我们分享一下	
8	2月25日 16:52	框架的一些实现原理
7.有其他问题要问老师的吗？

2	2月25日 14:18	暂时没有	
4	2月25日 14:23	框架的优缺点，现在学习的是原生和jq嘛，由于框架太多了，想挑选一个学习，能大概讲下么。包括nodejs后端有哪些优势，哪些缺点	
6	2月25日 14:29	一次都没收到过面试，好惆怅	
8	2月25日 16:52	Vue中有哪些用到了ES6新语法










