
require.config({
    //Remember: only use shim config for non-AMD scripts,
    //scripts that do not already call define(). The shim
    //config will not work correctly if used on AMD scripts,
    //in particular, the exports and init config will not
    //be triggered, and the deps config will be confusing
    //for those cases.
    //an application compatibility workaround
    shim: {
    	'shim-0':{
            //手动告诉如何找依赖，管理非AMD规范代码
            //depths depencenies
    		deps: ['shim-1']
    	}
    },
    baseUrl:'src';
 });
debugger;
//  猜测===> require.js全局配置 window.require
require(['starting','shim-0'],function(start,shim) {
    console.log(start.getData())
	console.log('终于加载完了')
});

// a - b
//     | - c 
//     | - d 
//     | - |- d1

// logic ===> amd模块 define([],()=>{}) 
            // ==> 加载非amd规范

   

