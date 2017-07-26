# 前端监控模型

客户端发起网络请求
===> 路由节点监控
服务端响应请求
===> 客户端监控
客户端得到响应

## 路由节点监控
输入参数
    |- 网址(域名)
    |- 设备类型
    |- 
监控架构模型
|- B(浏览器) <--> S(服务器) 
    |- 报警机制
        |- [webview 架构下]native报警(timeout),加载view skeleton
        |- [传统h5/pc] 用户反馈
        |- 用户反馈入口 检测(域名列表)
    |- 反馈机制    
        |- 监控平台域名dns/traceRoute/ping等返回网络传输数据
        |— data --> 监控可视化平台

## 客户端监控(性能)
输入参数
    |- html + js + css + image
监控需求
    |- 基础需求
    |- |- 客户端加载错误 (onerror)
    |- |- 客户端网络环境 (navigator.connection)
    |- |- 首屏时间      (onload)
    |- |- 浏览器类型    (navigator.userAgent) 
    |- |- 浏览器API     (localStorage)
    |- |- cookie       (navigator.cookieEnabled)
    |- |- cdn节点       (new image + scriptElement)
   

## 参考资料
[web fundamentals](https://developers.google.com/web/fundamentals/performance/)






