



var _1 = require('./1');
var _2 = require('./2');
console.log(document.body)
let cache = document.body.innerHTML;

document.body.innerHTML  = `${cache} I am main`
