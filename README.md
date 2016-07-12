# 注解扩展第三方库

> 该库是node-annotation的扩展库，包含其自定义扩展注解。

[点击这里查看node-annotation](https://github.com/Robinlim/node-annotation)

演示实例请挪驾 [node-annotation-example](https://github.com/Robinlim/node-annotation-example)

## 监控注解

以下两种注解依赖于statsd-client库，一些监控展现平台是不具备计算能力的，需要一个前置计算的中间服务，这里对应的是statsd服务
### Qmonitor
监控方法的调用次数
### Qmonitor_RRT
监控服务接口的耗时
