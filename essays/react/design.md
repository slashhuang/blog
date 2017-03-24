# React组件设计及代码规范

> react技术栈已深入各大互联网公司。

> 关于组件设计这块，大家经常谈的就是高阶组件、props等等。

> 而关于组件规范，则更多的集中在propTypes和defaultProps等等。

> 本文是作者针对React项目的组件设计和代码规范简述的个人心得，

> 希望能给react开发者带来些新的思想。

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

> 一个信息完备的React组件，一般都具备上述这种结构。

- 采用propTypes来描述组件对外接口的数据类型和含义。

- 采用this.state来描述组件内部的数据结构。

> 基本上，满足上述形式的react代码已经具备一定的维护性。

> 它的不足之处在于，别的开发者想要增加组件的功能必须要修改源代码。

> 而如果这个组件被多处复用，修改源代码变成了一件危险的事情。

> 那么，问题来了，怎么在不修改源代码的基础上为组件增加功能呢？

## 高阶组件HOC

### 一个简单的定义

> 高阶组件的概念来自于高阶函数，一般指的是函数参数为ReactComponent class，函数的return值也为ReactComponent class。

### 引入HOC

> 我们引入HOC来为刚刚的组件的点击事件增加钩子:event hook

```javascript
    //hook事件 增加程序动态性
    import _ from 'lodash';
    const highOrderFunc=methodHook=>InnerComponent=>{
        _.forIn(methodHook, (hookFn, key)=>{
            let cache = InnerComponent.prototype[key]
            InnerComponent.prototype[key]=function(...args){
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
            return <div onClick={::this.clickFunc} id='test'>{this.state.text}</div>
        }
     };
    render(<FirstComponent />,document.getElementById('root'))
```

> 当我们做了如上操作后，点击id='test'的节点，即可在控制台打印hook click called。

> 于是利用这个HOC，我们就渐渐实现了一个日志系统，把console.log替换成打点逻辑的话，

> 就可以轻松实现非侵入式的前端打点系统。

> 这里需要说明的是，代码中的@符号是ES7的decorator语法，采用它是为了让代码更加简洁。


### 引入HOC修改dataModel

> 上一个例子，我们采用HOC对React组件嵌入了事件逻辑。

> 在这个基础上，我们再采用HOC来实现数据模型props和state的侵入。






















