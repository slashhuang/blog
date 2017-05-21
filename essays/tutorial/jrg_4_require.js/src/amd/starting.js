console.log('loading starting started ')
define(['./test/inc'],function(inc){
   console.log('loading starting done ')
   inc.add1();
   inc.add1();
   return {inc:'inc'}
});