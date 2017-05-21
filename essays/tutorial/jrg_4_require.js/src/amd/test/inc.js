console.log('loading test/inc started ')
define(function() {
  console.log('loading test/inc done ')
  var a = 1;
  var inc = {
    add1: function() {
      return a++;
    },
    getRes: function() {
      return a;
    }
  };
  return inc;
});