# 2017年nodeJS展望


## 技术选型nodeJS版本

#### 简述
> nodeJS的LTS是严格按照官方计划执行，虽然目前的feature版本是7.5.0,但是对应的LTS计划并没有推出。
> 目前nodeJS的Acitve版本是V6系列，在此笔者推荐大家在生产环境使用V6系列的nodeJS，
> 毕竟出了问题可以提出issue,也会有专门的maintainer及时处理。
> nodeJS对于V7系列的开发也是相当的积极，2016年就出了很多feature和patch,
> 也是挺推荐喜欢尝鲜的开发者进行此版本的使用。

## nodeJS 2016年官方技术调查报告

#### 开发者生态
> 笔者今早看完了2016年nodeJS官方的调查报告，不得不说nodeJS的发展速度确实是非常惊人。
> 2016年全球有350万开发者使用nodeJS,相比去年保持了100%的增长率.

#### 技术趋势要点
> 官方报告的核心要点对于我们国内开发者来说，有挺多值得国内的nodeJS开发者关注的。
> 在此笔者主要提炼一下几点。

1.全栈工程师含义的丰富化

> 全栈工程师业务领域从frontEnd + backEnd转变为frontEnd + backEnd + connected Device。
> 由于VR、electron、nw等、包括国内的小程序、reactNative、weex等native领域的技术创新，
> JS的应用领域已经进入multi-terminal时代。

2.MEAN技术栈2016年爆发式增长

> mongo+express+ng+nodejs技术栈在2016年得到大力的推广。
> 当然，相比express而言，笔者认为2017年开始koa将会逐渐后来居上。
> 相比angular,react或者vue也会迎头赶上。
> 明年的技术栈潮流可能会逐渐变为MKRN或者MKVN，当然angular的庞大技术生态圈暂时仍旧会是主流。

3.生产环境大面积应用nodeJS
> 在调查的350万nodeJS的开发者中，有45%的开发者在企业级应用中采用了V4+的nodeJS稳定版本。

4. IoT范围下使用nodeJS成为一大亮点
> IoT的概念可能有些同学不太了解，它的全拼是Internet of things。
> 全栈工程师们在IoT范围大量使用了nodeJS，在这块的创新点，目测国内也走的很快。
> 所以，就和阿里egg.js开发者天猪所说，国内的开发者在国际领域的影响力已经越来越大了。


我主要摘录以下几点。








#### 参考资料
[nodeJS LTS](https://github.com/nodejs/LTS#lts-schedule)
[2016年nodejs使用官方调查](https://nodejs.org/static/documents/2016-survey-report.pdf)
[linkedin高性能nodejs](https://engineering.linkedin.com/nodejs/blazing-fast-nodejs-10-performance-tips-linkedin-mobile)