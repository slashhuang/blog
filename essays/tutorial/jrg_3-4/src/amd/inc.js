define(function() {

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