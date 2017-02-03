



webpack2新增的能力。

1. webpack以harmony mode处理```export/import``` 


- 模块加载器参数变化 由exports转为__webpack_exports__。
>(function(module, __webpack_exports__, __webpack_require__) 

- 兼容ES6的harmony 模块引入方式。
> /* harmony export (binding) */ __webpack_require__.d

> /* harmony default export */ __webpack_exports__["default"]

[ES.next](https://addyosmani.com/writing-modular-js/)
[ES harmony module proposal](http://wiki.ecmascript.org/doku.php?id=harmony:modules)

- webpack提供的module.exports与ES6模块兼容方式
```javascript
    /******/ 	// getDefaultExport function for compatibility with non-harmony modules
    /******/ 	__webpack_require__.n = function(module) {
                    // 如果是ES harmony的模块 就return ['default'],不然直接return module
    /******/ 		var getter = module && module.__esModule ?
    /******/ 			function getDefault() { return module['default']; } :
    /******/ 			function getModuleExports() { return module; };
                    //在getter上挂载a property
    /******/ 		__webpack_require__.d(getter, 'a', getter);
    /******/ 		return getter;
    /******/ 	};
```
> 值得一提的的是import NAME from ''这种形式的变量名NAME将会由__webpack_require__.n
> 转换成_WEBPACK_IMPORTED_MODULE_0__module___default.a的形式

- require.ensure异步加载采用__webpack_require__进行加载，不兼容export default。




//webpack这两种模式严格区分开
import Obj from './test'; ==> export default

import {test} ==> export test

## Using ES6 modules with webpack

> webpack will not touch your code other than import/export.
> In case you are using other ES6 features, make sure to use a transpiler such as Babel or Bublé.

## Using webpack with a config
webpack --config webpack.config.js

## Using webpack with npm
```javascript
    {
    ...
    "scripts": {
        "build": "webpack"
    },
    ...
    }
```

## webpack.config报错体系