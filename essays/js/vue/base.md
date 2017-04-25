## 从vuex角度看vue源码

`react`和`vue`的出现极大的降低了前端开发的难度，而要完成一个前端工程化的项目，除了view层框架外还需要model层的配合。

作为前端数据管理方案的杰出代表，`redux`和`Vuex`都实践着`event sourcing`、`single store`、`action`、`dispatch`等时髦概念。

为了更好的使用`vuex`,笔者在学习`vuex`的demo过程中,顺便看了一些`Vue.js`的源码，特分享一些关于`vue`的心得。


### 从构造函数看vue

我们从如下简单的Vue项目代码，debugger断点入手看问

```js
    import Vue from 'vue'
    import Counter from './Counter.vue'
    import store from './store'
    //debugger断点
    new Vue({
      el: '#app',
      store,
      render: h => h(Counter)
    })
```
