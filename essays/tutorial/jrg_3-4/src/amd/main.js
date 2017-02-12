
require.config({
    //Remember: only use shim config for non-AMD scripts,
    //scripts that do not already call define(). The shim
    //config will not work correctly if used on AMD scripts,
    //in particular, the exports and init config will not
    //be triggered, and the deps config will be confusing
    //for those cases.
    shim: {
    	'shim-0':{
    		deps: ['shim-1']
    	}
    }
 });
require(['starting','shim-0'],function(start,shim) {
	debugger;
});
console.log("starting");
