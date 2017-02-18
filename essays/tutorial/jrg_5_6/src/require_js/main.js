



/*
 * built by slashhuang
 * 17/2/18
 */

 require(['./1','./2'],function(_1,_2) {
 	let body = document.body
	let cache = body.innerHTML;
	body.innerHTML  = `${cache} I am requirejs main`
 })