
/*
 * built by slashhuang
 * 17/2/18
 */


var _1 = require('./1');
var _2 = require('./2');
let body = document.body
let cache = body.innerHTML;
//模板字符串 ES6
// body.innerHTML  = `${cache} I am webpack main`;
// 换成ES5的代码
body.innerHTML  = cache + ' I am webpack main';
alert(1);
