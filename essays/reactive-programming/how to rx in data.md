## operator in rxjs

rxjs是近两年国内前端圈经常探讨的话题，但无论是stackOverflow还是国内技术论坛，大部分对rxjs的提问都集中在如何理解、如何使用的阶段。
出现这个情况的原因，一方面是reactive-programming这种编程范式(paradigm)要求前端开发者从timeLine的维度看待数据变化，另一方面是rxjs提供的大量operator和设计模式给开发者带来了快速上手的难度。
 
本次分享，我会分为三块内容来展开对rxjs的讨论。
 
第一块是讲解rxjs的一些核心概念，以便不熟悉rxjs的同学能够对rxjs有所理解。
第二块是介绍rxjs在钉钉的实践以及我们在优化代码过程中的一些做法。
第三块是分享我对rxjs的一些思考。
 
前言
在对数据实时性要求高的产品比如钉钉的IM聊天，我们的消息需要多端同步，数据的push和pull贯穿整个IM应用场景。在选型react + redux技术栈的基础上，我们需要一个强大的redux中间件和工具来处理async的数据场景；普遍存在的race condition(比如切换会话)和数据流处理 要求这个工具在async外有强大的数据adaptor的能力。 而这些能力恰恰都能通过rxjs提供的operator、Observable、observer等来更好的实现。
 
选型rxjs意味着拥抱rx带来的新概念: Observable、observer、operator、subscriber...
对于不太熟悉rx的同学来说，这些新概念可以拓宽大家对数据处理方案的认识，也能给业务处理带来更多的选择。
 
OK，下面我先简单介绍rxjs的基本使用。
 
rxjs快速上手
 
我们从一段简单的代码来快速学习rxjs
const observable = Rx.Observable.of(1, 2, 3);
const observer = {
 next: (ret) => {
    console.log(ret) // print 1 2 3
  },
};
observable.subscribe(observer)
// [代码地址](http://jsbin.com/jewekeh/edit?html,js,console,output)
 
这段简单代码引入了rxjs的两大核心概念，observer和observable。
Observable api目前已在tc39的提案中。(https://tc39.github.io/proposal-observable/)。
关于这两个概念，我先贴出官方的解释，避免中文翻译产生的描述失真，然后进行简单的中文翻译。
Observable主要有两大特点: 1. a push-based data stream
start emitting data when an observer has subscribed.
简单的说就是数据生产者，但是保持惰性直到被注册。
Observer: 1. An interface for a consumer of push-based notifications delivered by an observable
简单的说就是数据消费者，用来接收observable抛出的数据。
 
这么解释后，我们回头看刚刚的那段代码就很直观了(不赘述)。
 
design patterns
rxjs的api设计充斥着三大设计思想，理解它们对于学习rxjs可以说是事半功倍，下面我简单介绍下。
observer pattern: 观察者模式
iterator pattern: 遍历模式
functional programming思想。
 
observer模式和iterator模式在rxjs运用最直观的体现就在于Observable和observer的通知方式。
 
当Observable生产了新的数据时，rxjs内部遍历数据抛出的设计方式借鉴了iterator模式，通知注册该Observable的观察者列表则运用了observer模式【具体这两种设计模式的解释文末会放链接】。
 
functional programming的思想实践主要体现在operator上，比如rxjs内部实现普遍采用的高阶函数、用纯函数来描述数据转换、数据入参及计算过程等。
 
下面我将分享rxjs在钉钉的实践和一些思考，来进一步展开对rxjs的讨论。
 
rxjs in Dingtalk
在钉钉新版桌面端改造的过程中，我们使用了时下流行的react+redux的技术方案。
钉钉的复杂业务给前端开发带来的挑战不仅在于数据接口和数据模型繁多，还在于数据模型的变化很多。
比如消息发送就有发送中、发送失败、发送成功三种状态，有消息推送/拉取、已读/未读等等逻辑。
 
在数据复杂度高、应用迭代快速的要求下，我们急需一个强大的redux中间件和数据流处理库。
我们选择了redux-observable和rxjs，由redux-observable来处理redux action的异步行为，由rxjs来处理数据的生产、分发、转换及订阅。
 
Dingtalk在rxjs的实践上，我会重点介绍两个场景作为例子。
IM场景下，点击会话切换如何实现消息和用户信息的快速上屏。
联系人页场景，用户切换请求，如何避免race Condition产生的数据交错。
 
IM消息快速上屏
下图是我在钉钉 IM应用里面的一张截图
 

在上面这张截图里面，所有红框圈出来的UI部分都需要在首屏时，去不同的接口异步拉取，同时在后续用户的行为中保持变更同步(这只是其中的小部分数据)。如上，屏幕上渲染出来的内容是切换会话这个行为发起的一系列数据请求、数据计算、数据合并的结果。
 

大体的action流程可以看上面这张图。
我们使用了redux-observable提供的ofType操作符来连结action的流转，由rxjs来处理action payload相关的数据合并、buffer与转换。 redux-observable的知识，单独开一节也可以讲很多，这边不赘述，大家可以去github了解，这边我们回归Rxjs的讲解。
 
刚刚已经说到rxjs的Observable可以简单的理解为数据生产方，这边为了更好的结合钉钉的应用场景，我们可以理解Observable为: A set of values over time，时间轴上的数据。
 
我们以上图说的displayNameFetch为例。
在钉钉IM里面，用户的名字 = f(conversationId)，不同的会话可能会有不同的名字展现。
当我们在会话中渲染名字时，如果名字没有在内存中，则需要异步拉取。
拉取名字其中一个难点在于请求数繁多，因为一个大群里面的每个人的名字都是一个请求。
 
对于请求数繁多的问题，我们可以用rxjs提供的bufferTime来做请求数据的合并，这样就可以轻易做到请求合并 f([name1]), f([name2]) => f([name1, name2])。对应模拟的rxjs的代码如下:
const obs$ = Rx.Observable.interval(1000);
obs$.bufferTime(2000).subscribe((ret) => {
    console.log(ret) // print [0],[1, 2],[3, 4]
});
 
对于race condition这块，我们主要采用的是switchMap和takeUntil，这两个operator。限于篇幅，我直接写个demo code来演示takeUntil。
//emit value every 1s
const source = Rx.Observable.interval(1000);
//after 5 seconds, emit value
const timer = Rx.Observable.timer(5000);
//when timer emits after 5s, complete source
const example = source.takeUntil(timer);
//output: 0,1,2,3
const subscribe = example.subscribe(val => console.log(val));
 
// http://jsbin.com/yevuhukeja/1/edit?js,console
以上代码涉及到一个operator叫做takeUntil,用来连接三个变量: source、timer、example。takeUntil做的事情是直到timer抛值之前让source不断抛值,所以最后控制台打印值为0,1,2,3。
 
这里面的理解可能对新手有点抽象，我会在下一个主题里面讲到operator在内部的实现机理。
 
More on rxjs
现在让我们来回顾下刚刚分享的一些内容:
Observable/Observer/Subscribe/Operator + rxjs的设计理念。
 
我们可以在以上内容中感受到time、emit、subscribe、stream等等抽象概念，这些都是合理的。
rxjs的leader benlesh在youtube上面有非常多的rxjs的分享，大多数是深入浅出的入门级讲演。
我们dingTalk的桌面前端已经广泛的应用了rxjs，它让我们的数据逻辑、异步管理变得清晰而直观。
 
在下面的内容中，我将简单分享下rxjs内部operator做的事情，以及个人的一些思考。
 
Operator:
 

以上是rxjs官方对operator的解释，它就是个函数而已。
我们写个简单的函数来实现抛出数据 *10的功能。[代码地址](http://jsbin.com/fulusaq/edit?html,js,console,output)
 

我们可以看到multiplyByTen做的事情是返回一个Observable实例，在input抛值逻辑上做了个数据值的投射(project)函数而已。 其实就是这么简单而已。
比如在rxjs中普遍使用的map、mapTo就是简单的投射函数而已，比较复杂的bufferTime则是在内部会维护buffer列表来实现buffer功能等等。当然，rxjs内部的实现会比我这边描述的复杂一些。
 
Promise、generator和rxjs比较？
 
大部分前端开发对以上三个概念的实践度应该是 Promise(async await) > generator > rxjs。
Promise让我们摆脱了callback hell，generator让我们用co的方式写代码，rxjs让代码变得流式飘逸。
 
市面上关于上面三者已经有很多讨论了，包括Promise进入error后没法retry，generator+co的代码大多数场景下可以用async await更简单的表达，rxjs上手难度太高等等。
 
在我看来，rxjs的优秀在于它对change propagation的抽象和实现。
对比工厂产品生产线，我们可以把rxjs的Observable、Observer看成数据生产和数据消费；operator看成是数据加工，消费者是否抛弃产品看成是subscription等等。
 
从结合的角度看，rxjs是一个实践reactive的库，在rxjs里面完全可以使用Promise和generator。
从Api设计角度看，rxjs和generator都拥有next api【iterator pattern】来表达数据抛出，都能很好的对程序过程进行描述。
 
关于异步处理，前端的XHR、animation等等，都可以用rxjs很好的模拟。 benlesh关于rxjs和animation结合使用也有个很好的分享，有兴趣的同学可以直接去youtube上面进一步学习。
 
总结:
rxjs是现在比较时髦的异步处理库(框架),比较适合在异步处理和数据变化繁多的业务场景下使用它。 当开发者渐渐熟悉rx的逻辑之后，相信对数据流处理会感觉到极大的直观易用。
 
anyway, happy rxing。
 
 
 
 
 