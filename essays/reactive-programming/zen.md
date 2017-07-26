## rxJS

Observer pattern + iterator pattern + functional programming


fp: 
1. expression rather than statements
2. that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data. It is a declarative programming paradigm, which means programming is done with expressions[1] or declarations[2] instead of statements. In functional code, the output value of a function depends only on the arguments that are passed to the function,


https://en.wikipedia.org/wiki/Iterator_pattern#JavaScript

iterator pattern: js[done, value, next]
```js
function reverseArrayIterator(array) {
    var index = array.length - 1;
    return {
       next: () =>
          index >= 0 ?
           {value: array[index--], done: false} :
           {done: true}
    }
}

const it = reverseArrayIterator(['three', 'two', 'one']);
console.log(it.next().value);  //-> 'one'
console.log(it.next().value);  //-> 'two'
console.log(it.next().value);  //-> 'three'
console.log(`Are you done? ${it.next().done}`);  //-> true

```


The iterator pattern decouples algorithms from containers
 in which an iterator is used to traverse a container and access the container's elements. The iterator pattern decouples algorithms from containers; in some cases, algorithms are necessarily container-specific and thus cannot be decoupled.