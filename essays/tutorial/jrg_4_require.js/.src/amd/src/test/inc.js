 console.log('loading test/inc done ')
 // 满足amd规范的模块
 define(function() {
  var a = 1;
  return {
    add1: function() {
      return a++;
    },
    getRes: function() {
      return a;
    }
  };
});