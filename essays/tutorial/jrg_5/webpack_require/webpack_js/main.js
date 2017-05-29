
/*
 * built by slashhuang
 * 17/2/18
 */
var _1 = require('./1');
var _2 = require('./2');
let body = document.body
let cache = body.innerHTML;
body.innerHTML  = `${cache} I am requirejs main`
