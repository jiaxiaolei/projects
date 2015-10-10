




gearman 异步框架


Gearman及python客户端安装和简单试用
http://my.oschina.net/zhangxu0512/blog/213467

Gearman 简介

Gearman是一个用来把工作委派给其他机器、分布式的调用更适合做某项工作的机器、并发的做某项工作在多个调用间做负载均衡、或用来在调用其它语言的函数的系统。
Gearman提供了一种通用的程序框架来将你的任务分发到不同的机器或者不同的进程当中。它提供了你进行并行工作的能力、负载均衡处理的能力，以及在不同程序语言之间沟通的能力。Gearman能够应用的领域非常广泛，从高可用的网站到数据库的复制任务。总之，Gearman就是负责分发处理的中枢系统，它的优点包括：

开源：Gearman免费并且开源而且有一个非常活跃的开源社区，如果你想来做一些贡献，请点击 。
多语言支持：Gearman支持的语言种类非常丰富。让我们能够用一种语言来编写Worker程序，但是用另外一种语言编写Client程序。
灵活：不必拘泥于固定的形式。您可以采用你希望的任何形式，例如 Map/Reduce。
快速：Gearman的协议非常简单，并且有一个用C语言实现的，经过优化的服务器，保证应用的负载在非常低的水平。
可植入：因为Gearman非常小巧、灵活。因此您可以将他置入到现有的任何系统中。
没有单点：Gearman不仅可以帮助扩展系统，同样可以避免系统的失败。
Gearman的原理

     [导言]Gearman最初在LiveJournal用于图片resize功能，由于图片resize需要消耗大量计算资源，因此需要调度到后端多台服务器执行，完成任务之后返回前端再呈现到界面。Gearman分布式任务实现原理上只用到2个字段，function name和data。function name即任务名称，由client传给job server, job server根据function name选择合适的worker节点来执行。
     
 
 实战搭建Gearman 分布式处理框架 + python客户端
 http://blog.csdn.net/robby213/article/details/6437739
 
 

 
 
     
     