## 前端技术JS trick之babel-stage杂谈-2月

## JS语法篇

> 目前前端生态圈采用ES6/7来写代码已经成为潮流，babel则是支撑这一潮流的主要pillar。

> 关于JS语法AST解析，babel提供了stage-X实验性插件集合供开发者使用。

> 这部分语法尚在实验阶段，在每次的TC39大会后会不断的更新stage的等级。
> 以便能够以规范的形式进入开发者的视野。

> 结合个人实践和babel官方文档，笔者在此列述以下非常简便的语法sugar。

### 插件preset之 babel-preset-stage-4

#### 指数函数简写形式(Exponentiation operator transform)
> 包括async to generator,trailing commas，这个提案已经由stage-3移至stage-4。

```javascript
    let squared = 2 ** 3;// same as: Math.pow(2,3)
    let a **= 2; // same as: Math.pow(a,3)
```
#### async generator异步流控制
> 这一块在浏览器环境需要增加babel-polyfill添加regeneratorRuntime

```javascript
    (async ()=>{
        var data = await new Promise(function(resolve,reject) {
            setTimeout(()=>resolve(100),100);
        });
        console.log(data); //100
    })();
```

### 插件preset之 babel-preset-stage-3

#### rest方式解构对象

```javascript
    // Rest properties
    let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
    console.log(x); // 1
    console.log(z); // { a: 3, b: 4 }
```
### 插件preset之 babel-preset-stage-2

#### 引入decorator处理transform-decorators-legacy

```javascript
    @decorator
    class Bork {}
```
#### 转换class属性 Class properties transform

```javascript

    class Bork {
        //Property initializer syntax
        instanceProperty = "bork";
        boundFunction = () => {
          return this.instanceProperty;
        }
        //Static class properties
        static staticProperty = "babelIsCool";
        static staticFunction = function() {
          return Bork.staticProperty;
        }
    }
    let myBork = new Bork;
    //Property initializers are not on the prototype.
    console.log(myBork.prototype.boundFunction); // > undefined

    //Bound functions are bound to the class instance.
    console.log(myBork.boundFunction.call(undefined)); // > "bork"

    //Static function exists on the class.
    console.log(Bork.staticFunction()); // > "babelIsCool"

```


### 插件preset之 babel-preset-stage-1

#### transform-class-constructor-call
> 它提供了将构造函数作为普通函数来使用的方案。
> 原理上是采用了new.target来引用constructor。
> 不过在babel7，这个feature将会移除。
```javascript
    class A {
        constructor(){
            this.a=1;
        }
        call constructor(){
            return 1
        }
    }
    console.log(new A()) ;// {a:1}
    console.log(A()) //1
```
#### transform-export-extensions

> ES6/7 export import混用体系
> 这块内容语法基本和阮一峰老师的ES6语法module部分的文末保持一致。

### 插件preset之 babel-preset-stage-0

#### transform-do-expressions
> 它是三目运算符的复杂版本，在条件分支决定返回值的场景非常有用。
```javascript
  let x = 100, y = 20;
    let a = do {
    if(x > 10) {
        if(y > 20) {
        'big x, big y';
        } else {
        'big x, small y';
        }
    } else {
        "hello world"
    }}
```
> 值得一提的是如果大家使用react框架的话，do表达式简直太有用了。
> 比如如下的一个动态组件例子
```javascript
  const Component = color =>
  <div className='myComponent'>
    {do {
      if(color === 'blue') { <BlueComponent/>; }
      else if(color === 'red') { <RedComponent/>; }
      else if(color === 'green') { <GreenComponent/>; }
    }}
  </div>
```
#### transform-function-bind

> 这一块是动态this绑定的语法糖
> 在react的事件场景或者改变this的场景，语法非常简洁。
```javascript
    const box = {
        weight: 2,
        getWeight() { return this.weight; },
    };
    console.log(box.getWeight()); // prints '2'
    console.log({ weight: 10 }::box.getWeight()); // prints '10'
```


### 结语
> stage-x是babel根据proposal做的语法transformer.
> 这边摘录下babel官方的文档说明。
```bash
    stage-0 - Strawman: just an idea, possible Babel plugin.
    stage-1 - Proposal: this is worth working on.
    stage-2 - Draft: initial spec.
    stage-3 - Candidate: complete spec and initial browser implementations.
    stage-4 - Finished: will be added to the next yearly release.
```
> 完。

### 参考资料
> [babel插件官方链接](https://babeljs.io/docs/plugins)
> [阮一峰ES6入门](http://es6.ruanyifeng.com/)


