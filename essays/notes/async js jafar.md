## Netflix JavaScript Talks - Async JavaScript with Reactive Extensions

### Async is Hard

1. introduce variable to track callback
2. try catch, sync propagate error
3. memory leak for event listeners
4. callback hell
5. race conditions



### focus on two patterns:

1. iterator, consumer call next until done
2. observer, add callback to data producuer, it calls you


iterator <===== progressively send information to consumer ==> observer


### what's the difference between an array and an event?

the majority of netflixs's async code is writtern with just a few flexible functions

[1, 2, 3].map((x) => (x * x + 1)).filter((x) => (x > 5)).


## introducing Observables

Observable = collections + time

Observables can model 
    - events
    - data requests
    - animations


Event subsciption 

addEventListener/removeEventListener

subscription dispose

## netflix search example

- race condition





[video link](https://www.youtube.com/watch?v=XRYN2xt11Ek&t=1448s)