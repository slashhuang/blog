# The Rise of Async JavaScript and RxJS Observables - JazzCon 2017

## history

callbacks ==> promises ==multi task


- more readable and maintainable
- sync-looking but non blocking
- use native flow control constructs
- more declarative and versatile


Promise ==> async + await

for of ==> Promise.all

- readble ,sync like code 
- native flow control constructs
- sequential and concurrent processing

## Events and Streams

### counter example
- spread listener
- mutating state 
=> lost where the result gone

rxjs solves the problem

## rxjs


Arrays:
[1,2,3,4,5] => sequence in space

Observables:
sequence in time

1. base Observable.of example

- 动画演示

2. declarative transformation, operate on events

- example: map operator


[video link](https://www.youtube.com/watch?v=tm9BBx99vvM)

3. lazy transformation(do only as much work as needed)

- example: take operator


4. cancel 
promise.cancel ==> obs$.cancel











