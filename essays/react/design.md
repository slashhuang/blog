# React组件设计及代码规范

react技术栈已深入各大互联网公司。

关于组件设计这块，大家经常谈的就是高阶组件、props等等。

而关于组件规范，则更多的集中在propTypes和defaultProps等等。

本文是作者针对React项目的组件设计和代码规范简述的个人心得，

希望能给react开发者带来些新的思想。

## 基本的react组件范式

```javascript
    import { Component,PropTypes },React from 'react';
    import {render} from 'react-dom';
    class FirstComponent extends Component{
        constructor(){
            super();
            this.state={ text: 'hello world' }
        }
        static propTypes={
            velocity: PropTypes.number,//滚动速度
            imageArray: PropTypes.array// 图片源
        }
        static defaultProps={
            velocity:500,//滚动速度
            imageArray:[],//图片源
        }
        clickFunc(){
            this.setState({text:'I am clicked'})
        }
        render(){
            return <div onClick={::this.clickFunc}>{this.state.text}</div>
        }
     };
```

一个信息完备的React组件，一般都具备上述这种结构。

- 采用propTypes来描述组件对外接口的数据类型和含义。

- 采用this.state来描述组件内部的数据结构。

基本上，满足上述形式的react代码已经具备一定的维护性。

它的不足之处在于，别的开发者想要增加组件的功能必须要修改源代码。

而如果这个组件被多处复用，修改源代码变成了一件危险的事情。

那么，问题来了，怎么在不修改源代码的基础上为组件增加功能呢？

## 高阶组件HOC来丰富组件功能

### 一个简单的定义

高阶组件的概念来自于高阶函数，一般指的是函数参数为ReactComponent class，函数的return值也为ReactComponent class。

一个基本的高阶组件写法如下

```javascript
    const HOC = 参数=>(目标组件)=>{
        return ()=>{
            目标组件 + 参数增加的功能
        }
    }
```
> 接下来，我们采用HOC来丰富组件的props+state+事件函数

### 引入HOC来丰富组件事件的功能

如下的例子稍加改进即可实现一个无侵入的打点系统

```javascript
    import _ from 'lodash';
    const highOrderFunc=methodHook=>InnerComponent=>{
        _.forIn(methodHook, (hookFn, key)=>{
            //引用目标组件原型
            let ref = InnerComponent.prototype;
            let cache = ref[key];
            //修改原型，hook我们自定义的功能
            ref[key]=function(...args){
                cache.apply(this,args)
                hookFn()
            }
        });
        return InnerComponent
    }
    @highOrderFunc({'clickFunc':()=>console.log('hook click called')})
    class FirstComponent extends Component{
        constructor(){
            super();
            this.state={ text: 'hello world' }
        }
        clickFunc(){
            this.setState({text:'I am clicked'})
        }
        render(){
            return <div onClick={::this.clickFunc}>{this.state.text}</div>
        }
     };
    render(<FirstComponent />,document.getElementById('root'))
```

当我们做了如上操作后，点击id='test'的节点，即可在控制台打印hook click called。

如果把highOrderFunc的第一个函数console.log替换成打点，即可实现非侵入式的react打点系统。

这里需要说明的是，代码中的@符号是ES7的decorator语法，这里不多做介绍。

这个例子演示的是采用HOC对React组件嵌入了事件逻辑。

下面我们继续写代码，采用HOC来实现props和state的侵入。


### 引入HOC修改dataModel

```javascript
    const highOrderFunc1=actions=>InnerComponent=>{
        class Inst1 extends Component{
            componentDidMount(){
                 let _ref = this.refs.InnerComponent;
                 //侵入事件
                 _ref.__proto__.clickFunc = function(...args){
                    this.props.Update();
                    let { text } = this.state;
                    this.setState({text:`add Text ${text}`})
                 }
            }
            render(){
                //侵入props数据
                this.props = {
                    ...this.props,
                    ...actions
                };
                return <InnerComponent ref='InnerComponent' {...this.props}/>
            }
        }
        return Inst1;
    }
    @highOrderFunc1({
        'Update':()=>{console.log('Update')}
    })
    class FirstComponent extends Component{
        constructor(){
            super()
            this.state={ text: 'hello world' }
        }
        clickFunc(){
            this.setState({text:'I am clicked'})
        }
        render(){
            return <div onClick={()=>this.clickFunc()}>{this.state.text}</div>
        }
     };
```
如上，我们通过高阶组件，实现了对FirstComponent组件的事件和props侵入。

第一个参数是actions用来丰富this.props，第二个参数则是我们的目标组件。

通过HOC夺取原来组件的控制权，之后的逻辑组合即完成了对组件功能和数据的极大丰富。

事实上，上面的实现已经非常类似于react-redux中的connect的功能了。

下面我们从另一个角度:代码设计,来看待React组件

## 定义Plugins接口实现插件体系

作为前端开发而言，UI的更新是一个平常的需求。

所以一个React组件，不仅需要兼顾功能，还必须兼顾UI。

我们通过约定Plugins接口，来实现组件UI更新的动态性。

```javascript
   class FirstComponent extends Component{
        constructor(){
            super()
            this.state={ text: 'hello world' }
        }
        renderPlugins(){
            let { Plugins } = this.props;
            let dataModel = {...this.props,...this.state};
            return do{
                if(typeof Plugins=='function'){;
                    <Plugins  dataModel={dataModel}/>
                }else{
                    Plugins;
                }
            }
        }
        clickFunc(){
            this.setState({text:'I am clicked'})
        }
        render(){
            return <div onClick={()=>this.clickFunc()}>
                    {this.state.text}
                    {Plugins && this.renderPlugins() }
                </div>
        }
     };
```
如上，我们预留了了Plugins接口。

当开发者需要修正UI样式的时候，可以定义Plugins侵入React组件。

在props更新的同时，Plugins也会被notify,从而完成和父级组件的UI同步。

这边要提下do expression，对于React组件中的条件运算非常有效。


## 结语

这篇文章洋洋洒洒都写了快200行了，感谢大家能够读到这里。

之后我将会分享几期关于Promise、co、generator、V8的小研究。

大家可以关注我的知乎和专栏。

完。






















