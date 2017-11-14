### 函数式编程讲的比较好的


[阮一峰 fp](http://www.ruanyifeng.com/blog/2012/04/functional_programming.html)

1. program paradigm
2. 函数一等公民
3. 只用"表达式"，不用"语句"
    函数式编程只要求把I/O限制到最小，不要有不必要的读写行为，保持计算过程的单纯性。
4. 没有"副作用"
    函数要保持独立，所有功能就是返回一个新的值，
5. 不修改状态
    函数式编程使用参数保存状态，最好的例子就是递归
6. 引用透明
    函数的运行不依赖于外部变量或"状态"，只依赖于输入的参数，任何时候只要参数相同，引用函数所得到的返回值总是相同的。

## [λ演算](https://en.wikipedia.org/wiki/Lambda_calculus)


motivation:

- 可计算函数 Computable functions 

- λ-calculus treats functions "anonymously", without giving them explicit names

- only uses functions of a single input

all functions in the lambda calculus are anonymous functions, having no names. They only accept one input variable, with currying used to implement functions with several variables.

Alpha equivalence
     particular choice of a bound variable, in a lambda abstraction, does not (usually) matter.
beta reduction
    (\lambda x.t)s\to t[x:=s] 
    corresponds to a computational step.


[unterminate lamda](https://stackoverflow.com/questions/42422467/beta-reduction-lambda-calculus)


