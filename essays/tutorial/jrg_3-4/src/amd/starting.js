define(['inc'],function(inc){
   console.log(inc.getRes());
   inc.add1();
   console.log(inc.getRes());
   inc.add1();
   console.log(inc.getRes());
   return {inc:'inc'}
});