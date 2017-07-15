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
|- B(浏览器) ----> S(服务器) 
|- [webview 架构下]
    ---> 加载view skeleton(timeout) 
        ---> 监控平台域名traceRoute/ping等返回网络节点数据
        ---> 监控平台可视化平台
|- [传统BS架构]
    ---> 加载view skeleton(timeout) 
        ---> 监控平台域名traceRoute/ping等返回网络节点数据
        ---> 监控平台可视化平台

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






