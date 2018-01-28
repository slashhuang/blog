## 2015-2017 summary

minus ==> positive

2015 1-6

jquery + html + css (BFC: box format comtext)

selector:  psudo element [class*=d] :hover

.a + .b
$('.c')      $('.c').find('.d').css("color", 'red').on('')

return this [instance]


function cons() {
    this.a = 'a';    
}
cons.prototype.click = function() {
    this.a = this.a + 1;
    console.log('clicked', this.a)
    return this;
};

var a = new cons();
a.click().click();


hyper text markup language

// tag + css 
<html>
    <head>
        <meta name="keywords" content="HTML,ASP,PHP,SQL"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        <meta charset="utf-8" />
        <link rel="stylesheet" hre="./hello.css">
    </head>
    <body>
        <div id="hello" class="test"></div>
        $('#hello').click(() => {
            alert('hello');
        })
        <script src="jquery.js"></script>
    </body>
</html>

// ng + require.js + gulp + node.js
// reputation
2015 6-9

ng  angular => google  框架 framework

require.js => sea.js  构建（打包）工具 模块化 ES6 ES7 Typescript

gulp 构建工具流  压缩、打包、上传cdn等

node.js   拥有后端能力  dev/local/daily/prod

工程师(中型菜鸟) => 美团点评

// 会用 感性理解, 设计思想(解决的问题)

<div class="a" ng-click="click(a)"> => 解决了selector的问题

<script src="1"></script> window.a=1
<script src="2"></script> window.a = 2;

// 变量重名，占用全局namespace,没有模块化和导入导出的概念


'cdn.require.js' => window.define + window.require

// 一个文件代表一个模块
define('', function() {
    return // 导出
});
require('../ddd.js', function(ddd){
});

node.js  I/O => input output  file IO/internet IO

## FRONT END engineer

senior/expert engineer
^^
||
too many junior engieer

工程师的能力==> framework + 打包构建 + 设计代码 + 基本的node.js

// observer / pub/sub / singleton
js ==> fuctional programming [curry化，pure function，模块化等]
多参函数转换为单参函数 

## Full stack engineer

front-end + server side

node.js ==> npm + path + fs + process对象 + http模块

## programmer reputation in community

- 技术社区 (github/zhihu) quora
- npm module

## your role? PO/PD/Worker

打工仔 => 自己职场的owner(选择跳槽？ 讨论设计方案？)

owner意识 担当,业务和技术都要有沉淀

