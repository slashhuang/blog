
// window.define
// 满足amd规范的模块
define(['./test/inc'],function(inc){

   console.log('inc',inc)	
   return {
   	inc:'inc',
   	getData :function(){
   		return inc.add1() 
   	}
   }
});