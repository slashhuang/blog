
require.config({
    //Remember: only use shim config for non-AMD scripts,
    //scripts that do not already call define(). The shim
    //config will not work correctly if used on AMD scripts,
    //in particular, the exports and init config will not
    //be triggered, and the deps config will be confusing
    //for those cases.
    shim: {
    	'shim-0':{
            //手动告诉如何找依赖，管理非AMD规范代码
    		deps: ['shim-1']
    	}
    }
 });
debugger;
require(['starting','shim-0'],function(start,shim) {
	console.log('终于加载完了')
});
console.log("starting");


// global ==> [ {
//     "./test/inc"
//     ,callback
// }   ]
   

