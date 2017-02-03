



webpack2新增的能力。

1. webpack以harmony mode处理```export/import``` 

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