# 前端设计模式作业答案

1. 写出 构造函数模式、混合模式、模块模式、工厂模式、单例模式、发布订阅模式的范例。
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


-------------------------------------------------


2. 工厂模式
function createPerson(name){
     var person = {
       name: name
     };
     person.sayName: function(){
       console.log(this.name);
     }
     return person;
};
createPerson('jirengu')


-------------------------------------------------


3. 单例模式
var People = (function(){
    var instance;
    function init(name) {
        return {
        	name:name
        };
    }
    return {
        createPeople: function(name) {
            if (!instance) {
                instance = init(name);
            }
            return instance;
        }
    };
}());
People.createPeople('jirengu')

-------------------------------------------------


4. 混合模式
// 实例1js
var Person = function(name, age) {
    this.name = name;
    this.age = age;
};
Person.prototype.sayName = function(){
  console.log(this.name);
}
var Student = function(name, age,  score) {
    Person.call(this, name, age);
    this.score = score;
};
//Student.prototype = Object.create(Person.prototype);
Student.prototype = create(Person.prototype);
function create (parentObj){
    function F(){}
    F.prototype = parentObj;
    return new F();
};
Student.prototype.sayScore = function(){
  console.log(this.score);
}
var student = new Student("饥人谷", 28, 99);


-------------------------------------------------


5. 模块模式

var Person = (function(){
	var name = 'ruoyu';
	function sayName(){
		console.log(name);
	}
	return {
		name: name,
		sayName: sayName
	}
})()


-------------------------------------------------


6. 订阅发布模式

var EventCenter = (function(){
  var events = {};
  function on(evt, handler){
    events[evt] = events[evt] || [];
    events[evt].push({
      handler: handler
    });
  }
  function fire(evt, args){
    if(!events[evt]){
      return;
    }
    for(var i=0; i<events[evt].length; i++){
      events[evt][i].handler(args);
    }
  }
  return {
    on: on,
    fire: fire
  }
})();



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










