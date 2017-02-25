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




