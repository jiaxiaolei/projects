
flask web 开发 阅读笔记



切换提交历史的 Git 命令是 git checkout。下面举个例子: $ git checkout 1a


你要把文件还原到原始状
￼￼￼编注 1:也可注册 iTuring.cn,在本书页面免费下载。
￼前言 | XIII
态。最简单的方法是使用 git reset 命令: $ git reset --hard
这个命令会损坏本地修改,所以执行此命令前你需要保存所有不想丢失的改动。



你可能经常需要从 GitHub 上下载修正和改进后的源码用于更新本地仓库。完成这个操作 的命令如下所示:
    $ git fetch --all
    $ git fetch --tags
    $ git reset --hard origin/master
git fetch 命令用于利用 GitHub 上的远程仓库更新本地仓库的提交历史和标签,但不会改 动真正的源文件,随后执行的 git reset 命令才是用于更新文件的操作。再次提醒,执行 git reset 命令后,本地修改会丢失。



执行下述命令可以查看 2a 和 2b 两个修订版本之 间的区别:
    $ git diff  2a 2b





Flask 有两个主要依赖:
路由、调试和 Web 服务器网关接口(Web Server Gateway Interface, WSGI)子系统由 Werkzeug(http://werkzeug.pocoo.org/)提供;
模板系统由 Jinja2(http:// jinja.pocoo.org/)提供。

Werkzeug 和 Jinjia2 都是由 Flask 的核心开发者开发而成。




虚拟环境使用第三方实用工具 virtualenv 创建。输入以下命令可以检查系统是否安装了 virtualenv:
     $ virtualenv --version


$ virtualenv --version
12.1.1





### 将来可以使用 pyenv 了....

Python 3.3 通过 venv 模块原生支持虚拟环境,命令为 pyvenv。pyvenv 可以替 代 virtualenv。不过要注意,在 Python 3.3 中使用 pyvenv 命令创建的虚拟环 境不包含 pip,你需要进行手动安装。Python 3.4 改进了这一缺陷,pyvenv 完 全可以代替 virtualenv。


### 一个小插曲：
windows, linux, mac 下使用 virtualenv 的不同方式：


大多数 Linux 发行版都提供了 virtualenv 包。例如,Ubuntu 用户可以使用下述命令安 装它:
$ sudo apt-get install python-virtualenv

如果你的电脑是 Mac OS X 系统,就可以使用 easy_install 安装 virtualenv:
$ sudo easy_install virtualenv

如果你使用微软的 Windows 系统或其他没有官方 virtualenv 包的操作系统,那么安装过
程要稍微复杂一点。
在浏览器中输入网址 https://bitbucket.org/pypa/setuptools,回车后会进入 setuptools 安装程 序的主页。在这个页面中找到下载安装脚本的链接,脚本名为 ez_setup.py。把这个文件保 存到电脑的一个临时文件夹中,然后在这个文件夹中执行以下命令:
     $ python ez_setup.py
     $ easy_install virtualenv



推出 virtualenv 最 ’优雅‘的方式是：

$ deactivate


大多数 Python 包都使用 pip 实用工具安装,使用 virtualenv 创建虚拟环境时会自动安装
pip。激活虚拟环境后,pip 所在的路径会被添加进 PATH。


所有 Flask 程序都必须创建一个程序实例。Web 服务器使用一种名为 Web 服务器网关接口 (Web Server Gateway Interface,WSGI)的协议,把接收自客户端的所有请求都转交给这
个对象处理。程序实例是 Flask 类的对象,经常使用下述代码创建: from flask import Flask
app = Flask(__name__)
Flask 类的构造函数只有一个必须指定的参数,即程序主模块或包的名字。在大多数程序
中,Python 的 __name__ 变量就是所需的值。


Flask() 参数除了 __name__ 外，还可以传递 sever 的文件名。


app = Flask('server')



将构造函数的 name 参数传给 Flask 程序,这一点可能会让 Flask 开发新手心 生迷惑。Flask 用这个参数决定程序的根目录,以便稍后能够找到相对于程 序根目录的资源文件位置。


 后文会介绍更复杂的程序初始化方式,对于简单的程序来说,上面的代码足够了。


 客户端(例如 Web 浏览器)把请求发送给 Web 服务器,Web 服务器再把请求发送给 Flask
￼￼￼￼7
程序实例。程序实例需要知道对每个 URL 请求运行哪些代码,所以保存了一个 URL 到 Python 函数的映射关系。处理 URL 和函数之间关系的程序称为路由。
在 Flask 程序中定义路由的最简便方式,是使用程序实例提供的 app.route 修饰器,把修 饰的函数注册为路由。下面的例子说明了如何使用这个修饰器声明路由:
      @app.route('/')
      def index():
          return '<h1>Hello World!</h1>'


修饰器是 Python 语言的标准特性,可以使用不同的方式修改函数的行为。惯 常用法是使用修饰器把函数注册为事件的处理程序。




前例把 index() 函数注册为程序根地址的处理程序。如果部署程序的服务器域名为 www. example.com,在浏览器中访问 http://www.example.com 后,会触发服务器执行 index() 函 数。这个函数的返回值称为响应,是客户端接收到的内容。如果客户端是 Web 浏览器,响 应就是显示给用户查看的文档。
像 index() 这样的函数称为视图函数(view function)。视图函数返回的响应可以是包含 HTML 的简单字符串,也可以是复杂的表单,后文会介绍。



在 Python 代码中嵌入响应字符串会导致代码难以维护,此处这么做只是为了 介绍响应的概念。你将在第 3 章了解生成响应的正确方法。


### 不建议在 python中直接对 Html 代码进行封装.... 


   @app.route('/user/<name>')
      def user(name):
return '<h1>Hello, %s!</h1>' % name
尖括号中的内容就是动态部分,任何能匹配静态部分的 URL 都会映射到这个路由上。调 用视图函数时,Flask 会将动态部分作为参数传入函数。在这个视图函数中,参数用于生 成针对个人的欢迎消息。
￼￼￼￼8|第2章
路由中的动态部分默认使用字符串,不过也可使用类型定义。例如,路由 /user/<int:id> 只会匹配动态片段 id 为整数的 URL。Flask 支持在路由中使用 int、float 和 path 类型。 path 类型也是字符串,但不把斜线视作分隔符,而将其当作动态片段的一部分。



这些配置就像是鸡肋, 
提供的小技巧....



/user/<name>

/user/<int:id>

__name__=='__main__' 是 Python 的惯常用法,在这里确保直接执行这个脚本时才启动开发 Web 服务器。如果这个脚本由其他脚本引入,程序假定父级脚本会启动不同的服务器,因 此不会执行 app.run()。

服务器启动后,会进入轮询,等待并处理请求。轮询会一直运行,直到程序停止,比如按 Ctrl-C 键。



  if __name__ == '__main__':
         app.run(debug=True)


有一些选项参数可被 app.run() 函数接受用于设置 Web 服务器的操作模式。在开发过程中 启用调试模式会带来一些便利,比如说激活调试器和重载程序。要想启用调试模式,我们 可以把 debug 参数设为 True。


## 借助 tornado, gunicore 等.... 
Flask 提供的 Web 服务器不适合在生产环境中使用。第 17 章会介绍生产环 境 Web 服务器。



程序和请求上下文
Flask 从客户端收到请求时,要让视图函数能访问一些对象,这样才能处理请求。请求对
象就是一个很好的例子,它封装了客户端发送的 HTTP 请求。 要想让视图函数能够访问请求对象,一个显而易见的方式是将其作为参数传入视图函数,
不过这会导致程序中的每个视图函数都增加一个参数。除了访问请求对象,如果视图函数
￼程序的基本结构 | 11
在处理请求时还要访问其他对象,情况会变得更糟。
为了避免大量可有可无的参数把视图函数弄得一团糟,Flask 使用上下文临时把某些对象 变为全局可访问。有了上下文,就可以写出下面的视图函数:
from flask import request
     @app.route('/')
     def index():
user_agent = request.headers.get('User-Agent') return '<p>Your browser is %s</p>' % user_agent
注意在这个视图函数中我们如何把 request 当作全局变量使用。事实上,request 不可能是 全局变量。试想,在多线程服务器中,多个线程同时处理不同客户端发送的不同请求时, 每个线程看到的 request 对象必然不同。Falsk 使用上下文让特定的变量在一个线程中全局 可访问,与此同时却不会干扰其他线程。


## 试想...
事实上,request 不可能是 全局变量。试想,在多线程服务器中,多个线程同时处理不同客户端发送的不同请求时, 每个线程看到的 request 对象必然不同


在 Flask 中有两种上下文:程序上下文和请求上下文。表 2-1 列出了这两种上下文提供的 变量。
表2-1 Flask上下文全局变量

current_app 当前激活程序的程序实例
g 处理请求时用作临时存储的对象。每次请求都会重设这个变量 
request 请求对象,封装了客户端发出的 HTTP 请求中的内容
session 用户会话,用于存储请求之间需要“记住”的值的词典

Flask 在分发请求之前激活(或推送)程序和请求上下文,请求处理完成后再将其删除。程 序上下文被推送后,就可以在线程中使用 current_app 和 g 变量。类似地,请求上下文被 推送后,就可以使用 request 和 session 变量。如果使用这些变量时我们没有激活程序上 下文或请求上下文,就会导致错误。如果你不知道为什么这 4 个上下文变量如此有用,先 别担心,后面的章节会详细说明。



下面这个 Python shell 会话演示了程序上下文的使用方法:
>>> from hello import app
>>> from flask import current_app 
>>> current_app.name
￼￼￼￼￼
Traceback (most recent call last):
     ...
     RuntimeError: working outside of application context
     >>> app_ctx = app.app_context()
     >>> app_ctx.push()
     >>> current_app.name
     'hello'
     >>> app_ctx.pop()
在这个例子中,没激活程序上下文之前就调用 current_app.name 会导致错误,但推送完上 下文之后就可以调用了。注意,在程序实例上调用 app.app_context() 可获得一个程序上 下文。


## 配置路由....
Flask 使用 app.route 修饰器或者非修饰器形式的 app.add_url_rule() 生成映射。



使用  app.url_map 来查看已有的url 配置。 

>>> from a import app
>>> app.url_map
Map([<Rule '/' (HEAD, OPTIONS, GET) -> hello>,
 <Rule '/static/<filename>' (HEAD, OPTIONS, GET) -> static>])
>>>



URL 映射中的 HEAD、Options、GET 是请求方法,由路由进行处理。
Flask 为每个路由都指 定了请求方法,这样不同的请求方法发送到相同的 URL 上时,会使用不同的视图函数进 行处理。HEAD 和 OPTIONS 方法由 Flask 自动处理,因此可以这么说,在这个程序中,URL 映射中的 3 个路由都使用 GET 方法。第 4 章会介绍如何为路由指定不同的请求方法。


请求钩子
有时在处理请求之前或之后执行代码会很有用。例如,在请求开始时,我们可能需要创 建数据库连接或者认证发起请求的用户。为了避免在每个视图函数中都使用重复的代码, Flask 提供了注册通用函数的功能,注册的函数可在请求被分发到视图函数之前或之后 调用。
￼￼请求钩子使用修饰器实现。Flask 支持以下 4 种钩子。
￼程序的基本结构 | 13
• before_first_request:注册一个函数,在处理第一个请求之前运行。
• before_request:注册一个函数,在每次请求之前运行。
• after_request:注册一个函数,如果没有未处理的异常抛出,在每次请求之后运行。
• teardown_request:注册一个函数,即使有未处理的异常抛出,也在每次请求之后运行。


在请求钩子函数和视图函数之间共享数据一般使用上下文全局变量 g。例如,before_ request 处理程序可以从数据库中加载已登录用户,并将其保存到 g.user 中。随后调用视 图函数时,视图函数再使用 g.user 获取用户。

### 
在钩子函数中，使用 程序上下文环境  g 




如果视图函数返回的响应需要使用不同的状态码,那么可以把数字代码作为第二个返回
值,添加到响应文本之后。例如,下述视图函数返回一个 400 状态码,表示请求无效:
     @app.route('/')
     def index():
         return '<h1>Bad Request</h1>', 400
视图函数返回的响应还可接受第三个参数,这是一个由首部(header)组成的字典,可以 添加到 HTTP 响应中。一般情况下并不需要这么做,不过你会在第 14 章看到一个例子。
如果不想返回由 1 个、2 个或 3 个值组成的元组,Flask 视图函数还可以返回 Response 对 象。make_response() 函数可接受 1 个、2 个或 3 个参数(和视图函数的返回值一样),并 返回一个 Response 对象。有时我们需要在视图函数中进行这种转换,然后在响应对象上调 用各种方法,进一步设置响应。下例创建了一个响应对象,然后设置了 cookie:
from flask import make_response
     @app.route('/')
     def index():
         response = make_response('<h1>This document carries a cookie!</h1>')
         response.set_cookie('answer', '42')
         return response


##NOTE:

     @app.route('/')
     def index():
         return '<h1>Bad Request</h1>', 400

这里设置了 返回结果， 界面可以正常显示。 http status = 400。  不影响界面前端显示...




有一种名为重定向的特殊响应类型。这种响应没有页面文档,只告诉浏览器一个新地址用 以加载新页面。重定向经常在 Web 表单中使用,第 4 章会进行介绍。

重定向经常使用 302 状态码表示,指向的地址由 Location 首部提供。重定向响应可以使用 3 个值形式的返回值生成,也可在 Response 对象中设定。不过,由于使用频繁,Flask 提 供了 redirect() 辅助函数,用于生成这种响应:
from flask import redirect
     @app.route('/')
     def index():
return redirect('http://www.example.com')


还有一种特殊的响应由 abort 函数生成,用于处理错误。在下面这个例子中,如果 URL 中
动态参数 id 对应的用户不存在,就返回状态码 404: from flask import abort
     @app.route('/user/<id>')
     def get_user(id):
         user = load_user(id)
         if not user:
abort(404)
return '<h1>Hello, %s</h1>' % user.name
注意,abort 不会把控制权交还给调用它的函数,而是抛出异常把控制权交给 Web 服 务器。



from flask import abort
     @app.route('/user/<id>')
     def get_user(id):
         user = load_user(id)
         if not user:
abort(404)
return '<h1>Hello, %s</h1>' % user.name

使用 abort(404) 之后，直接返回到页面。。


使用Flask-Script支持命令行选项
Flask 的开发 Web 服务器支持很多启动设置选项,但只能在脚本中作为参数传给 app.run()
函数。这种方式并不十分方便,传递设置选项的理想方式是使用命令行参数。
Flask-Script 是一个 Flask 扩展,为 Flask 程序添加了一个命令行解析器。Flask-Script 自带 了一组常用选项,而且还支持自定义命令。
Flask-Script 扩展使用 pip 安装:
(venv) $ pip install flask-script



## 终于看到 flask 中的命令行参数了...


from flask.ext.script import Manager manager = Manager(app)
# ...
     if __name__ == '__main__':
         manager.run()




执行命令行：
$ python hello.py runserver --host 0.0.0.0



# 这里把 模板 当作一个 逻辑分离的 工具
用户在网站中注册了一个新账户。用户在表单中输入电子邮件地址和密码,然后点 击提交按钮。服务器接收到包含用户输入数据的请求,然后 Flask 把请求分发到处理注册 请求的视图函数。这个视图函数需要访问数据库,添加新用户,然后生成响应回送浏览 器。这两个过程分别称为业务逻辑和表现逻辑。
把业务逻辑和表现逻辑混在一起会导致代码难以理解和维护。假设要为一个大型表格构建 HTML 代码,表格中的数据由数据库中读取的数据以及必要的 HTML 字符串连接在一起。 把表现逻辑移到模板中能够提升程序的可维护性。
模板是一个包含响应文本的文件,其中包含用占位变量表示的动态部分,其具体值只在请 求的上下文中才能知道。使用真实值替换变量,再返回最终得到的响应字符串,这一过程 称为渲染。为了渲染模板,Flask 使用了一个名为 Jinja2 的强大模板引擎。


示例 3-3 hello.py:渲染模板
from flask import Flask, render_template # ...
     @app.route('/')
     def index():
         return render_template('index.html')
     @app.route('/user/<name>')
     def user(name):
         return render_template('user.html', name=name)
Flask 提供的 render_template 函数把 Jinja2 模板引擎集成到了程序中。render_template 函 数的第一个参数是模板的文件名。随后的参数都是键值对,表示模板中变量对应的真实 值。在这段代码中,第二个模板收到一个名为 name 的变量。
前例中的 name=name 是关键字参数,这类关键字参数很常见,但如果你不熟悉它们的话, 可能会觉得迷惑且难以理解。左边的“name”表示参数名,就是模板中使用的占位符;右 边的“name”是当前作用域中的变量,表示同名参数的值。


示例 3-2 在模板中使用的 {{ name }} 结构表示一个变量,它是一种特殊的占位符,告诉模
板引擎这个位置的值从渲染模板时使用的数据中获取。



Jinja2 能识别所有类型的变量,甚至是一些复杂的类型,例如列表、字典和对象。在模板 中使用变量的一些示例如下:
     <p>A value from a dictionary: {{ mydict['key'] }}.</p>
     <p>A value from a list: {{ mylist[3] }}.</p>
     <p>A value from a list, with a variable index: {{ mylist[myintvar] }}.</p>
     <p>A value from an object's method: {{ myobj.somemethod() }}.</p>
可以使用过滤器修改变量,过滤器名添加在变量名之后,中间使用竖线分隔。例如,下述 模板以首字母大写形式显示变量 name 的值:
     Hello, {{ name|capitalize }}
表 3-1 列出了 Jinja2 提供的部分常用过滤器。 表3-1 Jinja2变量过滤器
safe 渲染值时不转义
capitalize 把值的首字母转换成大写,其他字母转换成小写 lower 把值转换成小写形式
upper 把值转换成大写形式
title 把值中每个单词的首字母都转换成大写
trim 把值的首尾空格去掉
striptags 渲染之前把值中所有的 HTML 标签都删掉
safe 过滤器值得特别说明一下。默认情况下,出于安全考虑,Jinja2 会转义所有变量。例 如,如果一个变量的值为 '<h1>Hello</h1>',Jinja2 会将其渲染成 '&lt;h1&gt;Hello&lt;/ h1&gt;',浏览器能显示这个 h1 元素,但不会进行解释。很多情况下需要显示变量中存储 的 HTML 代码,这时就可使用 safe 过滤器。
千万别在不可信的值上使用 safe 过滤器,例如用户在表单中输入的文本。
完整的过滤器列表可在 Jinja2 文档(http://jinja.pocoo.org/docs/templates/#builtin-filters)中 查看。
￼￼￼
### 这个过滤器是比较有趣的，虽然也是 '鸡肋'


### 这里聊一下 Jinja2 的控制结构：


Jinja2 提供了多种控制结构,可用来改变模板的渲染流程。本节使用简单的例子介绍其中
最有用的控制结构。
下面这个例子展示了如何在模板中使用条件控制语句:
{% if user %}
Hello, {{ user }}!
{% else %}
Hello, Stranger!
{% endif %}
另一种常见需求是在模板中渲染一组元素。下例展示了如何使用 for 循环实现这一需求:
<ul>
{% for comment in comments %}
<li>{{ comment }}</li> {% endfor %}
</ul>
Jinja2 还支持宏。宏类似于 Python 代码中的函数。例如:
{% macro render_comment(comment) %} <li>{{ comment }}</li>
{% endmacro %}
<ul>
{% for comment in comments %}
{{ render_comment(comment) }} {% endfor %}
</ul>
为了重复使用宏,我们可以将其保存在单独的文件中,然后在需要使用的模板中导入:
{% import 'macros.html' as macros %} <ul>
{% for comment in comments %}
{{ macros.render_comment(comment) }}
{% endfor %} </ul>
`
需要在多处重复使用的模板代码片段可以写入单独的文件,再包含在所有模板中,以避免 重复:
{% include 'common.html' %}
另一种重复使用代码的强大方式是模板继承,它类似于 Python 代码中的类继承。首先,创
建一个名为 base.html 的基模板: 22 | 第3章
￼￼
<html>
     <head>
{% block head %}
<title>{% block title %}{% endblock %} - My Application</title> {% endblock %}
     </head>
     <body>
{% block body %}
{% endblock %} </body>
</html>
block 标签定义的元素可在衍生模板中修改。在本例中,我们定义了名为 head、title 和
body 的块。注意,title 包含在 head 中。下面这个示例是基模板的衍生模板:
{% extends "base.html" %}
{% block title %}Index{% endblock %} {% block head %}
         {{ super() }}
         <style>
         </style>
{% endblock %}
{% block body %} <h1>Hello, World!</h1> {% endblock %}
extends 指令声明这个模板衍生自 base.html。在 extends 指令之后,基模板中的 3 个块被 重新定义,模板引擎会将其插入适当的位置。注意新定义的 head 块,在基模板中其内容不 是空的,所以使用 super() 获取原来的内容。
稍后会展示这些控制结构的具体用法,让你了解一下它们的工作原理。


导入模板：
{% include 'common.html' %}


继承模板：
{% extends "base.html" %}

然后替换：

{% block title %}Index{% endblock %}



基模板中其内容不 是空的,所以使用 super() 获取原来的内容。


### flask 中使用  bootstrap

pip install flask-bootstrap


Flask 扩展一般都在创建程序实例时初始化。示例 3-4 是 Flask-Bootstrap 的初始化方法。 示例 3-4 hello.py:初始化 Flask-Bootstrap
from flask.ext.bootstrap import Bootstrap # ...
bootstrap = Bootstrap(app)


基模板中定义了可在衍生模板中重定义的块。block 和 endblock 指令定义的块中的内容可
添加到基模板中。

基模板， 衍生模板： 

1. extends

2. block, endblock， 



### flask 中处理  错误页面.



自定义错误页面 

如果你在浏览器的地址栏中输入了不可用的路由,那么会显示一个状态码为 404 的错误页
面。现在这个错误页面太简陋、平庸,而且样式和使用了 Bootstrap 的页面不一致。
像常规路由一样,Flask 允许程序使用基于模板的自定义错误页面。最常见的错误代码有 两个:404,客户端请求未知页面或路由时显示;500,有未处理的异常时显示。为这两个 错误代码指定自定义处理程序的方式如示例 3-6 所示。
示例 3-6 hello.py:自定义错误页面
     @app.errorhandler(404)
     def page_not_found(e):
         return render_template('404.html'), 404
     @app.errorhandler(500)
     def internal_server_error(e):
         return render_template('500.html'), 500




任何具有多个路由的程序都需要可以连接不同页面的链接,例如导航条。
在模板中直接编写简单路由的 URL 链接不难,但对于包含可变部分的动态路由,在模板 中构建正确的 URL 就很困难。而且,直接编写 URL 会对代码中定义的路由产生不必要的 依赖关系。如果重新定义路由,模板中的链接可能会失效。
为了避免这些问题,Flask 提供了 url_for() 辅助函数,它可以使用程序 URL 映射中保存 的信息生成 URL。



url_for() 函数最简单的用法是以视图函数名(或者 app.add_url_route() 定义路由时使用 的端点名)作为参数,返回对应的 URL。例如,在当前版本的 hello.py 程序中调用 url_ for('index')得到的结果是/。调用url_for('index', _external=True)返回的则是绝对地 址,在这个示例中是 http://localhost:5000/。


生成连接程序内不同路由的链接时,使用相对地址就足够了。如果要生成在 浏览器之外使用的链接,则必须使用绝对地址,例如在电子邮件中发送的 链接。



使用 url_for() 生成动态地址时,将动态部分作为关键字参数传入。例如,url_for ('user', name='john', _external=True) 的返回结果是 http://localhost:5000/user/john。
传入 url_for() 的关键字参数不仅限于动态路由中的参数。函数能将任何额外参数添加到 查询字符串中。例如,url_for('index', page=2) 的返回结果是 /?page=2。


静态文件

Web 程序不是仅由 Python 代码和模板组成。大多数程序还会使用静态文件,例如 HTML
代码中引用的图片、JavaScript 源码文件和 CSS。
你可能还记得在第 2 章中检查 hello.py 程序的 URL 映射时,其中有一个 static 路由。 这是因为对静态文件的引用被当成一个特殊的路由,即 /static/<filename>。例如,调用 url_for('static', filename='css/styles.css', _external=True) 得 到 的 结 果 是 http:// localhost:5000/static/css/styles.css。
默认设置下,Flask 在程序根目录中名为 static 的子目录中寻找静态文件。如果需要,可在 static 文件夹中使用子文件夹存放文件。服务器收到前面那个 URL 后,会生成一个响应, 包含文件系统中 static/css/styles.css 文件的内容。
￼￼￼
示例 3-10 展示了如何在程序的基模板中放置 favicon.ico 图标。这个图标会显示在浏览器的 地址栏中。
示例 3-10 templates/base.html:定义收藏夹图标
{% block head %}
{{ super() }}
<link rel="shortcut icon" href="{{ url_for('static', filename = 'favicon.ico') }}"
type="image/x-icon">
<link rel="icon" href="{{ url_for('static', filename = 'favicon.ico') }}"
type="image/x-icon"> {% endblock %}
图标的声明会插入 head 块的末尾。注意如何使用 super() 保留基模板中定义的块的原始 内容。


## NOTE: 
flask 处理静态文件.... 



$ pip install flask-moment


要想在服务器上只使用 UTC 时间,一个优雅的解决方案是,把时间单位发送给 Web 浏览 器,转换成当地时间,然后渲染。Web 浏览器可以更好地完成这一任务,因为它能获取用 户电脑中的时区和区域设置。
有一个使用 JavaScript 开发的优秀客户端开源代码库,名为 moment.js(http://momentjs. com/),它可以在浏览器中渲染日期和时间。Flask-Moment 是一个 Flask 程序扩展,能把 moment.js 集成到 Jinja2 模板中。Flask-Moment 可以使用 pip 安装:
(venv) $ pip install flask-moment
这个扩展的初始化方法如示例 3-11 所示。 示例 3-11 hello.py:初始化 Flask-Moment
from flask.ext.moment import Moment moment = Moment(app)
￼￼￼
除了 moment.js,Flask-Moment 还依赖 jquery.js。要在 HTML 文档的某个地方引入这两个 库,可以直接引入,这样可以选择使用哪个版本,也可使用扩展提供的辅助函数,从内容 分发网络(Content Delivery Network,CDN)中引入通过测试的版本。Bootstrap 已经引入 了 jquery.js,因此只需引入 moment.js 即可。示例 3-12 展示了如何在基模板的 scripts 块 中引入这个库。



>>> from datetime import datetime
>>> datetime.utcnow()
datetime.datetime(2015, 8, 31, 5, 58, 12, 335275)



Flask-Monet 假定服务器端程序处理的时间戳是“纯正的”datetime 对象, 且使用 UTC 表示。关于纯正和细致的日期和时间对象 1 的说明,请阅读标准 库中 datetime 包的文档(https://docs.python.org/2/library/datetime.html)。



#### 所有的小工具都提供了相应的依赖...
要想用它，就得用它的相关依赖....


Flask-Moment 渲染的时间戳可实现多种语言的本地化。语言可在模板中选择,把语言代码 传给 lang() 函数即可:
     {{ moment.lang('es') }}




尽管 Flask 的请求对象提供的信息足够用于处理 Web 表单,但有些任务很单调,而且要重 复操作。比如,生成表单的 HTML 代码和验证提交的表单数据。
Flask-WTF(http://pythonhosted.org/Flask-WTF/)扩展可以把处理 Web 表单的过程变成一 种愉悦的体验。这个扩展对独立的 WTForms(http://wtforms.simplecodes.com)包进行了包 装,方便集成到 Flask 程序中。
Flask-WTF 及其依赖可使用 pip 安装: (venv) 
$ pip install flask-wtf


跨站请求伪造保护
默认情况下,Flask-WTF 能保护所有表单免受跨站请求伪造(Cross-Site Request Forgery,
CSRF)的攻击。恶意网站把请求发送到被攻击者已登录的其他网站时就会引发 CSRF 攻击。 为了实现 CSRF 保护,Flask-WTF 需要程序设置一个密钥。Flask-WTF 使用这个密钥生成
加密令牌,再用令牌验证请求中表单数据的真伪。设置密钥的方法如示例 4-1 所示。 示例 4-1 hello.py:设置 Flask-WTF
app = Flask(__name__)
app.config['SECRET_KEY'] = 'hard to guess string'

app.config 字典可用来存储框架、扩展和程序本身的配置变量。使用标准的字典句法就能 把配置值添加到 app.config 对象中。这个对象还提供了一些方法,可以从文件或环境中导 入配置值。
SECRET_KEY 配置变量是通用密钥,可在 Flask 和多个第三方扩展中使用。如其名所示,加 密的强度取决于变量值的机密程度。不同的程序要使用不同的密钥,而且要保证其他人不 知道你所用的字符串。


## flask 中对表单的封装.....


把 POST 加入方法列表很有必要,因为将提交表单作为 POST 请求进行处理更加便利。表单 也可作为 GET 请求提交,不过 GET 请求没有主体,提交的数据以查询字符串的形式附加到 URL 中,可在浏览器的地址栏中看到。基于这个以及其他多个原因,提交表单大都作为 POST 请求进行处理。

## form 表单多用  post 方法实现....


重定向和用户会话
最新版的 hello.py 存在一个可用性问题。用户输入名字后提交表单,然后点击浏览器的刷 新按钮,会看到一个莫名其妙的警告,要求在再次提交表单之前进行确认。之所以出现这 种情况,是因为刷新页面时浏览器会重新发送之前已经发送过的最后一个请求。如果这个 请求是一个包含表单数据的 POST 请求,刷新页面后会再次提交表单。大多数情况下,这并 不是理想的处理方式。
很多用户都不理解浏览器发出的这个警告。基于这个原因,最好别让 Web 程序把 POST 请 求作为浏览器发送的最后一个请求。
这种需求的实现方式是,使用重定向作为 POST 请求的响应,而不是使用常规响应。重定 向是一种特殊的响应,响应内容是 URL,而不是包含 HTML 代码的字符串。浏览器收到 这种响应时,会向重定向的 URL 发起 GET 请求,显示页面的内容。这个页面的加载可能 要多花几微秒,因为要先把第二个请求发给服务器。除此之外,用户不会察觉到有什么不 同。现在,最后一个请求是 GET 请求,所以刷新命令能像预期的那样正常使用了。这个技 巧称为 Post/ 重定向 /Get 模式。
但这种方法会带来另一个问题。程序处理 POST 请求时,使用 form.name.data 获取用户输 入的名字,可是一旦这个请求结束,数据也就丢失了。因为这个 POST 请求使用重定向处 理,所以程序需要保存输入的名字,这样重定向后的请求才能获得并使用这个名字,从而
￼Web表单 | 39
构建真正的响应。
程序可以把数据存储在用户会话中,在请求之间“记住”数据。用户会话是一种私有存 储,存在于每个连接到服务器的客户端中。我们在第 2 章介绍过用户会话,它是请求上下 文中的变量,名为 session,像标准的 Python 字典一样操作。


默认情况下,用户会话保存在客户端 cookie 中,使用设置的 SECRET_KEY 进 行加密签名。如果篡改了 cookie 中的内容,签名就会失效,会话也会随之 失效。


hello.py:重定向和用户会话
from flask import Flask, render_template, session, redirect, url_for
     @app.route('/', methods=['GET', 'POST'])
     def index():
         form = NameForm()
         if form.validate_on_submit():
             session['name'] = form.name.data
             return redirect(url_for('index'))
         return render_template('index.html', form=form, name=session.get('name'))


## 用户会话。



推荐使用 url_for() 生成 URL,因为这 个函数使用 URL 映射生成 URL,从而保证 URL 和定义的路由兼容,而且修改路由名字后 依然可用。

url_for() 函数的第一个且唯一必须指定的参数是端点名,即路由的内部名字。默认情 况下,路由的端点是相应视图函数的名字。在这个示例中,处理根地址的视图函数是 index(),因此传给 url_for() 函数的名字是 index。
最后一处改动位于 render_function() 函数中,使用 session.get('name') 直接从会话中读 取 name 参数的值。和普通的字典一样,这里使用 get() 获取字典中键对应的值以避免未找 到键的异常情况,因为对于不存在的键,get() 会返回默认值 None。


flash() 消息 ， 太鸡肋了。

这些东西，都是由前端自行匹配的....



Web 程序最常用基 于关系模型的数据库,这种数据库也称为 SQL 数据库,因为它们使用结构化查询语言。不 过最近几年文档数据库和键值对数据库成了流行的替代选择,这两种数据库合称 NoSQL 数据库。


结构化查询数据库。 


NoSQL 数据库更适合设计成如图 5-2 所示的结构。这是执行反规范化操作得到的结果,它 减少了表的数量,却增加了数据重复量。



使用 NoSQL 数据库当然也有好处。数据重复可以提升查询速度。列出用户及其角色的操 作很简单,因为无需联结。


SQL 数据库擅于用高效且紧凑的形式存储结构化数据。这种数据库需要花费大量精力保证
数据的一致性。NoSQL 数据库放宽了对这种一致性的要求,从而获得性能上的优势。 对不同类型数据库的全面分析、对比超出了本书范畴。对中小型程序来说,SQL 和 NoSQL
数据库都是很好的选择,而且性能相当。



大多数的数据库引擎都有对应的 Python 包,包括开源包和商业包。Flask 并不限制你使 用何种类型的数据库包,因此可以根据自己的喜好选择使用 MySQL、Postgres、SQLite、 Redis、MongoDB 或者 CouchDB。
如果这些都无法满足需求,还有一些数据库抽象层代码包供选择,例如 SQLAlchemy 和 MongoEngine。你可以使用这些抽象包直接处理高等级的 Python 对象,而不用处理如表、 文档或查询语言此类的数据库实体。


选择数据库框架时,你要考虑很多因素。
易用性
如果直接比较数据库引擎和数据库抽象层,显然后者取胜。抽象层,也称为对象关系 映射(Object-Relational Mapper,ORM)或对象文档映射(Object-Document Mapper, ODM),在用户不知觉的情况下把高层的面向对象操作转换成低层的数据库指令。
性能
ORM 和 ODM 把对象业务转换成数据库业务会有一定的损耗。大多数情况下,这种性 能的降低微不足道,但也不一定都是如此。一般情况下,ORM 和 ODM 对生产率的提 升远远超过了这一丁点儿的性能降低,所以性能降低这个理由不足以说服用户完全放弃 ORM 和 ODM。真正的关键点在于如何选择一个能直接操作低层数据库的抽象层,以 防特定的操作需要直接使用数据库原生指令优化。
可移植性
 选择数据库时,必须考虑其是否能在你的开发平台和生产平台中使用。例如,如果你打
 算利用云平台托管程序,就要知道这个云服务提供了哪些数据库可供选择。


可移植性还针对 ORM 和 ODM。尽管有些框架只为一种数据库引擎提供抽象层,但其 他框架可能做了更高层的抽象,它们支持不同的数据库引擎,而且都使用相同的面向对 象接口。SQLAlchemy ORM 就是一个很好的例子,它支持很多关系型数据库引擎,包 括流行的 MySQL、Postgres 和 SQLite。
FLask集成度
选择框架时,你不一定非得选择已经集成了 Flask 的框架,但选择这些框架可以节省 你编写集成代码的时间。使用集成了 Flask 的框架可以简化配置和操作,所以专门为 Flask 开发的扩展是你的首选。
基于以上因素,本书选择使用的数据库框架是 Flask-SQLAlchemy(http://pythonhosted.org/ Flask-SQLAlchemy/),这个 Flask 扩展包装了 SQLAlchemy(http://www.sqlalchemy.org/)框架。



pip install flask-sqlalchemy


在 Flask-SQLAlchemy 中,数据库使用 URL 指定。最流行的数据库引擎采用的数据库 URL 格式如表 5-1 所示。
表5-1 FLask-SQLAlchemy数据库URL
￼
数据库引擎
URL
MySQL
Postgres SQLite(Unix) SQLite(Windows)
mysql://username:password@hostname/database postgresql://username:password@hostname/database sqlite:////absolute/path/to/database sqlite:///c:/absolute/path/to/database
￼在这些 URL 中,hostname 表示 MySQL 服务所在的主机,可以是本地主机(localhost), 也可以是远程服务器。数据库服务器上可以托管多个数据库,因此 database 表示要使用的 数据库名。如果数据库需要进行认证,username 和 password 表示数据库用户密令。




SQLite 数据库不需要使用服务器,因此不用指定 hostname、username 和 password。URL 中的 database 是硬盘上文件的文件名。


示例 5-1 展示了如何初始化及配置一个简单的 SQLite 数据库。
示例 5-1 hello.py:配置数据库
from flask.ext.sqlalchemy import SQLAlchemy
basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__) app.config['SQLALCHEMY_DATABASE_URI'] =\
'sqlite:///' + os.path.join(basedir, 'data.sqlite') app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
db = SQLAlchemy(app)
db 对象是 SQLAlchemy 类的实例,表示程序使用的数据库,同时还获得了 Flask-SQLAlchemy
提供的所有功能。




Flask-SQLAlchemy 要求每个模型都要定义主键,这一列经常命名为 id。

定义模型
模型这个术语表示程序使用的持久化实体。在 ORM 中,模型一般是一个 Python 类,类中
的属性对应数据库表中的列。
Flask-SQLAlchemy 创建的数据库实例为模型提供了一个基类以及一系列辅助类和辅助函 数,可用于定义模型的结构。图 5-1 中的 roles 表和 users 表可定义为模型 Role 和 User, 如示例 5-2 所示。
示例 5-2 hello.py:定义 Role 和 User 模型
     class Role(db.Model):
         __tablename__ = 'roles'
         id = db.Column(db.Integer, primary_key=True)
         name = db.Column(db.String(64), unique=True)
def __repr__(self):
return '<Role %r>' % self.name
     class User(db.Model):
         __tablename__ = 'users'
         id = db.Column(db.Integer, primary_key=True)
         username = db.Column(db.String(64), unique=True, index=True)
def __repr__(self):
return '<User %r>' % self.username
类变量 __tablename__ 定义在数据库中使用的表名。如果没有定义 __tablename__,Flask- 数据库 | 47
￼￼￼
SQLAlchemy 会使用一个默认名字,但默认的表名没有遵守使用复数形式进行命名的约定, 所以最好由我们自己来指定表名。其余的类变量都是该模型的属性,被定义为 db.Column 类的实例。
db.Column 类构造函数的第一个参数是数据库列和模型属性的类型。表 5-2 列出了一些可用 的列类型以及在模型中使用的 Python 类型。
表5-2 最常用的SQLAlchemy列类型
￼
类型名
Python类型
说  明
Integer int
SmallInteger int
BigInteger int 或 long Float float
Numeric decimal.Decimal String str
Text str
Unicode unicode UnicodeText unicode
Boolean bool
Date datetime.date Time datetime.time DateTime datetime.datetime Interval datetime.timedelta Enum str
PickleType 任何 Python 对象 LargeBinary str
普通整数,一般是 32 位 取值范围小的整数,一般是 16 位 不限制精度的整数
浮点数
定点数
变长字符串 变长字符串,对较长或不限长度的字符串做了优化
变长 Unicode 字符串
变长 Unicode 字符串,对较长或不限长度的字符串做了优化 布尔值
日期
时间
日期和时间
时间间隔
一组字符串
自动使用 Pickle 序列化
二进制文件
￼db.Column 中其余的参数指定属性的配置选项。表 5-3 列出了一些可用选项。 表5-3 最常使用的SQLAlchemy列选项
primary_key 如果设为 True,这列就是表的主键
unique 如果设为 True,这列不允许出现重复的值
index 如果设为 True,为这列创建索引,提升查询效率
nullable 如果设为 True,这列允许使用空值;如果设为 False,这列不允许使用空值 default 为这列定义默认值


首先,我们要让 Flask-SQLAlchemy 根据模型类创建数据库。方法是使用 db.create_all() 函数:
      (venv) $ python hello.py shell
      >>> from hello import db
      >>> db.create_all()


OR 模型 图， 






sqlchemy:

user = m.session.query(User).filter_by(mobile=phone).first()



city = session.query(City).filter(City.id==city_id).first()



http://cn.pycon.org/2015/index.html

北京报名：
http://event.31huiyi.com/118591776




集成Python shell

每次启动 shell 会话都要导入数据库实例和模型,这真是份枯燥的工作。为了避免一直重复
导入,我们可以做些配置,让 Flask-Script 的 shell 命令自动导入特定的对象。 若想把对象添加到导入列表中,我们要为 shell 命令注册一个 make_context 回调函数,如
示例 5-7 所示。
示例 5-7 hello.py:为 shell 命令添加一个上下文
from flask.ext.script import Shell
     def make_shell_context():
         return dict(app=app, db=db, User=User, Role=Role)
manager.add_command("shell", Shell(make_context=make_shell_context)) make_shell_context() 函数注册了程序、数据库实例以及模型,因此这些对象能直接导入 shell:
￼$ python hello.py shell
>>> app
<Flask 'app'>
>>> db
<SQLAlchemy engine='sqlite:////home/flask/flasky/data.sqlite'> >>> User
<class 'app.User'>


这个很有用...


使用Flask-Migrate实现数据库迁移 在开发程序的过程中,你会发现有时需要修改数据库模型,而且修改之后还需要更新数据库。
仅当数据库表不存在时,Flask-SQLAlchemy 才会根据模型进行创建。因此,更新表的唯一 方式就是先删除旧表,不过这样做会丢失数据库中的所有数据。
更新表的更好方法是使用数据库迁移框架。源码版本控制工具可以跟踪源码文件的变化, 类似地,数据库迁移框架能跟踪数据库模式的变化,然后增量式的把变化应用到数据库中。
SQLAlchemy 的主力开发人员编写了一个迁移框架,称为 Alembic(https://alembic.readthedocs.
org/en/latest/index.html)。 除 了 直 接 使 用 Alembic 之 外,Flask 程 序 还 可 使 用 Flask-Migrate (http://flask-migrate.readthedocs.org/en/latest/)扩展。这个扩展对 Alembic 做了轻量级包装,并
集成到 Flask-Script 中,所有操作都通过 Flask-Script 命令完成。


## 
Flask-Migrate实现数据库迁移

感觉也是一个鸡肋......


总体来讲， orm 做的封装都是鸡肋...



自动创建的迁移不一定总是正确的,有可能会漏掉一些细节。自动生成迁移 脚本后一定要进行检查。

### 大爷， 都是鸡肋...


#NOTE:
预警机制， 真的很有必要...



很多类型的应用程序都需要在特定事件发生时提醒用户,而常用的通信方法是电子邮件。 虽然 Python 标准库中的 smtplib 包可用在 Flask 程序中发送电子邮件,但包装了 smtplib 的 Flask-Mail 扩展能更好地和 Flask 集成。




###NOTE:
喜欢专一的框架， 
做自己最擅长的事情。 

把自己事情做好...


而不是对其他成熟的东西做没有意义的封装...





千万不要把账户密令直接写入脚本,特别是当你计划开源自己的作品时。为 了保护账户信息,你需要让脚本从环境中导入敏感信息。


上述实现涉及一个有趣的问题。很多 Flask 扩展都假设已经存在激活的程序上下文和请求 上下文。Flask-Mail 中的 send() 函数使用 current_app,因此必须激活程序上下文。不过, 在不同线程中执行 mail.send() 函数时,程序上下文要使用 app.app_context() 人工创建。



现在再运行程序,你会发现程序流畅多了。不过要记住,程序要发送大量电子邮件时,使 用专门发送电子邮件的作业要比给每封邮件都新建一个线程更合适。例如,我们可以把执 行 send_async_email() 函数的操作发给 Celery(http://www.celeryproject.org/)任务队列。
至此,我们完成了对大多数 Web 程序所需功能的概述。现在的问题是,hello.py 脚本变得 越来越大,难以使用。在下一章中,你会学到如何组织大型程序的结构。



很多情况下，都应该区分一下测试情况和生产环境...



尽管在单一脚本中编写小型 Web 程序很方便,但这种方法并不能广泛使用。程序变复杂 后,使用单个大型源码文件会导致很多问题。
不同于大多数其他的 Web 框架,Flask 并不强制要求大型项目使用特定的组织方式,程序 结构的组织方式完全由开发者决定。在本章,我们将介绍一种使用包和模块组织大型程序 的方式。本书后续示例都将采用这种结构。



项目结构
Flask 程序的基本结构如示例 7-1 所示。
示例 7-1 多文件 Flask 程序的基本结构
|-flasky |-app/
         |-templates/
         |-static/
         |-main/
           |-__init__.py
           |-errors.py
           |-forms.py
           |-views.py
         |-__init__.py
         |-email.py
         |-models.py
       |-migrations/
       |-tests/
￼￼|-__init__.py
65
|-test*.py
       |-venv/
|-requirements.txt |-config.py |-manage.py
这种结构有 4 个顶级文件夹:
• Flask 程序一般都保存在名为 app 的包中;
• 和之前一样,migrations 文件夹包含数据库迁移脚本;
• 单元测试编写在 tests 包中;
• 和之前一样,venv 文件夹包含 Python 虚拟环境。
同时还创建了一些新文件:
• requirements.txt 列出了所有依赖包,便于在其他电脑中重新生成相同的虚拟环境;
• config.py 存储配置;
• manage.py 用于启动程序以及其他的程序任务。
为了帮助你完全理解这个结构,下面几节讲解把 hello.py 程序转换成这种结构的过程。



### 这里的文件结构也有问题：

1. env 局限在程序中，是不好的，至少是不够灵活的...



配置选项
程序经常需要设定多个配置。这方面最好的例子就是开发、测试和生产环境要使用不同的 数据库,这样才不会彼此影响。
我们不再使用 hello.py 中简单的字典状结构配置,而使用层次结构的配置类。config.py 文 件的内容如示例 7-2 所示。


## 这里也提到了 三网分离， 开发，测试， 生成环境，



app/main/errors.py:蓝本中的错误处理程序 from flask import render_template
      from . import main
      @main.app_errorhandler(404)
      def page_not_found(e):
          return render_template('404.html'), 404
      @main.app_errorhandler(500)
      def internal_server_error(e):
return render_template('500.html'), 500 在蓝本中编写错误处理程序稍有不同,如果使用 errorhandler 修饰器,那么只有蓝本中的
错误才能触发处理程序。要想注册程序全局的错误处理程序,必须使用 app_errorhandler。



manage.py:启动脚本
#!/usr/bin/env python
import os
from app import create_app, db
from app.models import User, Role
from flask.ext.script import Manager, Shell
from flask.ext.migrate import Migrate, MigrateCommand
app = create_app(os.getenv('FLASK_CONFIG') or 'default') manager = Manager(app)
migrate = Migrate(app, db)
     def make_shell_context():
         return dict(app=app, db=db, User=User, Role=Role)
     manager.add_command("shell", Shell(make_context=make_shell_context))
     manager.add_command('db', MigrateCommand)
     if __name__ == '__main__':
         manager.run()
这个脚本先创建程序。如果已经定义了环境变量 FLASK_CONFIG,则从中读取配置名;否则 使用默认配置。然后初始化 Flask-Script、Flask-Migrate 和为 Python shell 定义的上下文。
出于便利,脚本中加入了 shebang 声明,所以在基于 Unix 的操作系统中可以通过 ./manage. py 执行脚本,而不用使用复杂的 python manage.py。


##NOTE: 
.py 文件 首部的 “#!/usr/bin/env python” 到底什么用？
没见过特别明显的作用啊。。


若想把 tests 文 件夹作为包使用,需要添加 tests/__init__.py 文件,不过这个文件可以为空,



单元测试 这个程序很小,所以没什么可测试的。不过为了演示,我们可以编写两个简单的测试,如
示例 7-9 所示。
示例 7-9 tests/test_basics.py:单元测试
import unittest
from flask import current_app from app import create_app, db
     class BasicsTestCase(unittest.TestCase):
         def setUp(self):
             self.app = create_app('testing')
             self.app_context = self.app.app_context()
             self.app_context.push()
             db.create_all()
         def tearDown(self):
             db.session.remove()
             db.drop_all()
             self.app_context.pop()
         def test_app_exists(self):

self.assertFalse(current_app is None)
def test_app_is_testing(self): self.assertTrue(current_app.config['TESTING'])
这个测试使用 Python 标准库中的 unittest 包编写。setUp() 和 tearDown() 方法分别在各 测试前后运行,并且名字以 test_ 开头的函数都作为测试执行。



这里也提到了加盐值...


“Salted Password Hashing - Doing it Right”(计算加盐 密码散列值的正确方法,https://crackstation.net/hashing-security.htm)这篇文 章值得一读。



密码散列功能已经完成,可以在 shell 中进行测试:
     (venv) $ python manage.py shell
     >>> u = User()
     >>> u.password = 'cat'
     >>> u.password_hash
     'pbkdf2:sha1:1000$duxMk0OF$4735b293e397d6eeaf650aaf490fd9091f928bed'
     >>> u.verify_password('cat')
     True
     >>> u.verify_password('dog')
     False
     >>> u2 = User()
     >>> u2.password = 'cat'
     >>> u2.password_hash
     'pbkdf2:sha1:1000$UjvnGeTP$875e28eb0874f44101d6b332442218f66975ee89'


有些时候， python manager shell 还是挺有用的。。。


python 有一套自己的变量名 命名 方法...


from werkzeug.security import generate_password_hash, check_password_hash


1. flask-XXX 的小功能都很灵活，但也都显得是鸡肋...
2. flask-xxx 的使用，束缚很多， 
不如用原生的灵活....




auth 蓝本要在 create_app() 工厂函数中附加到程序上,如示例 8-5 所示。 示例 8-5 app/__init__.py:附加蓝本
def create_app(config_name): # ...
from .auth import auth as auth_blueprint app.register_blueprint(auth_blueprint, url_prefix='/auth')
return app
注册蓝本时使用的 url_prefix 是可选参数。如果使用了这个参数,注册后蓝本中定义的 所有路由都会加上指定的前缀,即这个例子中的 /auth。例如,/login 路由会注册成 /auth/ login,在开发 Web 服务器中,完整的 URL 就变成了 http://localhost:5000/auth/login。

#NOTE:
这个可以试着比较一下....




 pip install flask-login

8.4.2 保护路由
为了保护路由只让认证用户访问,Flask-Login 提供了一个 login_required 修饰器。用法演
示如下:
from flask.ext.login import login_required
     @app.route('/secret')
     @login_required
     def secret():
         return 'Only authenticated users are allowed!'
如果未认证的用户访问这个路由,Flask-Login 会拦截请求,把用户发往登录页面。


##这个有点像 tornado 中的 authorization, 做鉴权的时候， 前提是提供鉴权逻辑...


app/templates/auth/login.html:渲染登录表单
{% extends "base.html" %}
{% import "bootstrap/wtf.html" as wtf %}
￼￼￼￼用户认证 | 85
{% block title %}Flasky - Login{% endblock %}
{% block page_content %} <div class="page-header">
         <h1>Login</h1>
     </div>
     <div class="col-md-4">
         {{ wtf.quick_form(form) }}
</div>
{% endblock %}


这里的 current_user 有点像 tornado 中的current_user. 

## 这里连确认邮件都提供了....



把一大堆该自己做的事情，推给了一大堆扩张。
还美其名曰: 灵活，方便扩展..

殊不知，把一大堆功能藏在一大堆扩展模块中，噎死增加了学习，使用成本....

要的是自己可以做，而不是‘等我叫人...’


from flask.ext.login import login_user, logout_user, login_required, \
    current_user

### 有一大堆自己的特性....


认证蓝本使用的电子邮件模板保存在 templates/auth/email 文件夹中,以便和 HTML 模板 区分开来。第 6 章介绍过,一个电子邮件需要两个模板,分别用于渲染纯文本正文和富 文本正文。举个例子,示例 8-20 是确认邮件模板的纯文本版本,对应的 HTML 版本可到 GitHub 仓库中查看。
示例 8-20 app/templates/auth/email/confirm.txt:确认邮件的纯文本正文 Dear {{ user.username }},



修改密码， 修改邮箱 这些功能竟然也都做了实现... 

太逗了。。。


## todo: 97  用户角色..  这是在做一个博客系统....


有多种方法可用于在程序中实现角色。具体采用何种实现方法取决于所需角色的数量和细 分程度。例如,简单的程序可能只需要两个角色,一个表示普通用户,一个表示管理员。 对于这种情况,在 User 模型中添加一个 is_administrator 布尔值字段就足够了。复杂的 程序可能需要在普通用户和管理员之间再细分出多个不同等级的角色。有些程序甚至不能 使用分立的角色,这时赋予用户某些权限的组合或许更合适。



这里的权限组 控制，之前在 PABB 中做到就很有意思.....


## 看了这么多例子， flask 中也主要是 后端 + 模板跳转的例子...



# p 110 



通过显示用户的头像,我们可以进一步改进资料页面的外观。在本节,你会学到如何添加 Gravatar(http://gravatar.com/)提供的用户头像。Gravatar 是一个行业领先的头像服务,能 把头像和电子邮件地址关联起来。用户先要到 http://gravatar.com 中注册账户,然后上传图 片。生成头像的 URL 时,要计算电子邮件地址的 MD5 散列值:
     (venv) $ python
     >>> import hashlib
     >>> hashlib.md5('john@example.com'.encode('utf-8')).hexdigest()
     'd4c74594d841139328695756648b6bd6'

##NOTE: 
这些服务都是鸡肋...




为保证安装了所有依赖,我们还要运行 pip install -r requirements/dev.txt。



如果你从 GitHub 上克隆了这个程序的 Git 仓库,那么可以执行 git checkout 11c 签出程序的这个版本。为保证安装了所有依赖,我们还要运行 pip install -r requirements/dev.txt。

## 这里有 ForgeryPy 的使用，值得借鉴...


@main.route('/', methods=['GET', 'POST'])

def index():
         # ...
         page = request.args.get('page', 1, type=int)
         pagination = Post.query.order_by(Post.timestamp.desc()).paginate(
page, per_page=current_app.config['FLASKY_POSTS_PER_PAGE'],
             error_out=False)
         posts = pagination.items
         return render_template('index.html', form=form, posts=posts,
pagination=pagination)

渲染的页数从请求的查询字符串(request.args)中获取,如果没有明确指定,则默认渲
染第一页。参数 type=int 保证参数无法转换成整数时,返回默认值。

## 原来这是他的真实含义啊... 


sqlalchemy 的分页对象.... 
## 看他们这里用的挺好的...


使用Markdown和Flask-PageDown支持富 文本文章
对于发布短消息和状态更新来说,纯文本足够用了,但如果用户想发布长文章,就会觉得
在格式上受到了限制。本节我们要将输入文章的多行文本输入框升级,让其支持 Markdown (http://daringfireball.net/projects/markdown/)语法,还要添加富文本文章的预览功能。
实现这个功能要用到一些新包。
• PageDown:使用 JavaScript 实现的客户端 Markdown 到 HTML 的转换程序。
• Flask-PageDown:为 Flask 包装的 PageDown,把 PageDown 集成到 Flask-WTF 表单中。
• Markdown:使用 Python 实现的服务器端 Markdown 到 HTML 的转换程序。
• Bleach:使用 Python 实现的 HTML 清理器。

#NOTE: 
这里集成了富文本编辑器， 还是挺有意思的，挺好的...


如果你从 GitHub 上克隆了这个程序的 Git 仓库,那么可以执行 git requirements/dev.txt。



### 参考一下开源项目的 flask 架构...

在服务器上处理富文本
提交表单后,POST 请求只会发送纯 Markdown 文本,页面中显示的 HTML 预览会被丢掉。 和表单一起发送生成的 HTML 预览有安全隐患,因为攻击者轻易就能修改 HTML 代码, 让其和 Markdown 源不匹配,然后再提交表单。安全起见,只提交 Markdown 源文本,在 服务器上使用 Markdown(使用 Python 编写的 Markdown 到 HTML 转换程序)将其转换 成 HTML。得到 HTML 后,再使用 Bleach 进行清理,确保其中只包含几个允许使用的
￼博客文章 | 125
HTML 标签。


为了能在关系中处理自定义的数据,我们必须提升关联表的地位,使其变成程序可访问的 模型。新的关联表如示例 12-1 所示,使用 Follow 模型表示。



应用编程接口
最近几年,Web 程序有种趋势,那就是业务逻辑被越来越多地移到了客户端一侧,开创出 了一种称为富互联网应用(Rich Internet Application,RIA)的架构。在 RIA 中,服务器的 主要功能(有时是唯一功能)是为客户端提供数据存取服务。在这种模式中,服务器变成 了 Web 服务或应用编程接口(Application Programming Interface,API)。


## 这里说的就是 (Rich Internet Application,RIA)的架构
服务器只提供数据，和数据保存。 不负责页面渲染等工作....


最近几年,Web 程序有种趋势,那就是业务逻辑被越来越多地移到了客户端一侧,开创出 了一种称为富互联网应用(Rich Internet Application,RIA)的架构。在 RIA 中,服务器的 主要功能(有时是唯一功能)是为客户端提供数据存取服务。在这种模式中,服务器变成 了 Web 服务或应用编程接口(Application Programming Interface,API)。
RIA 可采用多种协议与 Web 服务通信。远程过程调用(Remote Procedure Call,RPC)协议, 例如 XML-RPC,及由其衍生的简单对象访问协议(Simplified Object Access Protocol,SOAP), 在几年前比较受欢迎。最近,表现层状态转移(Representational State Transfer,REST)架构崭 露头角,成为 Web 程序的新宠,因为这种架构建立在大家熟识的万维网基础之上。
Flask 是开发 REST 架构 Web 服务的理想框架,因为 Flask 天生轻量。在本章,你将学到 如何使用 Flask 实现符合 REST 架构的 API。



REST简介
Roy Fielding 在其博士论文(http://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.
htm)中介绍了 Web 服务的 REST 架构方式,并列出了 6 个符合这一架构定义的特征。 客户端-服务器
 客户端和服务器之间必须有明确的界线。
无状态
 客户端发出的请求中必须包含所有必要的信息。服务器不能在两次请求之间保存客户端

 的任何状态。
缓存
 服务器发出的响应可以标记为可缓存或不可缓存,这样出于优化目的,客户端(或客户
 端和服务器之间的中间服务)可以使用缓存。
接口统一
客户端访问服务器资源时使用的协议必须一致,定义良好,且已经标准化。REST Web 服务最常使用的统一接口是 HTTP 协议。
系统分层
 在客户端和服务器之间可以按需插入代理服务器、缓存或网关,以提高性能、稳定性和
 伸缩性。
按需代码
 客户端可以选择从服务器上下载代码,在客户端的环境中执行。


 表 14-1 列出了 REST 架构 API 中常用的 请求方法及其含义。
表14-1 REST架构API中使用的HTTP请求方法
GET 单个资源的 URL GET 资源集合的 URL
POST 资源集合的 URL PUT 单个资源的 URL
DELETE 单个资源的 URL DELETE 资源集合的 URL
获取目标资源 200
获取资源的集合(如果服务器实现了分页,就是一页中 200 的资源) 创建新资源,并将其加入目标集合。服务器为新资源指 201 派 URL,并在响应的 Location 首部中返回 修改一个现有资源。如果客户端能为资源指派 URL,还 200 可用来创建新资源
删除一个资源 200 删除目标集合中的所有资源 200
￼￼REST 架构不要求必须为一个资源实现所有的请求方法。如果资源不支持 客户端使用的请求方法,响应的状态码为 405,返回“不允许使用的方法”。 Flask 会自动处理这种错误。



REST Web 服务常用的两种编码方式是 JavaScript 对象表示法(JavaScript Object Notation, JSON)和可扩展标记语言(Extensible Markup Language,XML)。对基于 Web 的 RIA 来 说,JSON 更具吸引力,因为 JSON 和 JavaScript 联系紧密,而 JavaScript 是 Web 浏览器 使用的客户端脚本语言。



这里涉及到版本向下兼容的问题：


但升级 RIA 和 Web 服务要复杂得多,因为客户端程序和服务器上的程序是独立开发的, 有时甚至由不同的人进行开发。你可以考虑一下这种情况,即一个程序的 REST Web 服 务被很多客户端使用,其中包括 Web 浏览器和智能手机原生应用。服务器可以随时更新 Web 浏览器中的客户端,但无法强制更新智能手机中的应用,更新前先要获得机主的许 可。即便机主想进行更新,也不能保证新版应用上传到所有应用商店的时机都完全吻合新 服务器端版本的部署。



基于以上原因,Web 服务的容错能力要比一般的 Web 程序强,而且还要保证旧版客户端 能继续使用。这一问题的常见解决办法是使用版本区分 Web 服务所处理的 URL。例如, 首次发布的博客 Web 服务可以通过 /api/v1.0/posts/ 提供博客文章的集合



创建API蓝本
REST API 相关的路由是一个自成一体的程序子集,所以为了更好地组织代码,我们最好
把这些路由放到独立的蓝本中。这个程序 API 蓝本的基本结构如示例 14-1 所示。 示例 14-1 API 蓝本的结构
|-flasky |-app/
         |-api_1_0
           |-__init__.py
           |-users.py
           |-posts.py
           |-comments.py
           |-authentication.py
           |-errors.py
           |-decorators.py
注意,API 包的名字中有一个版本号。如果需要创建一个向前兼容的 API 版本,可以添加 一个版本号不同的包,让程序同时支持两个版本的 API。
在这个 API 蓝本中,各资源分别在不同的模块中实现。蓝本中还包含处理认证、错误以及 提供自定义修饰器的模块。蓝本的构造文件如示例 14-2 所示。
示例 14-2 app/api_1_0/__init__.py:API 蓝本的构造文件 from flask import Blueprint
     api = Blueprint('api', __name__)
     from . import authentication, posts, users, comments, errors



错误处理
REST Web 服务将请求的状态告知客户端时,会在响应中发送适当的 HTTP 状态码,并将
额外信息放入响应主体。客户端能从 Web 服务得到的常见状态码如表 14-2 所示。

表14-2 API返回的常见HTTP状态码
200 OK(成功)
201 Created(已创建)
400 Bad request(坏请求)
401 Unauthorized(未授权)
403 Forbidden(禁止)
404 Notfound(未找到)
405 Method not allowed(不允许使用的方法)
500 Internal server error(内部服务器错误)
请求成功完成 请求成功完成并创建了一个新资源 请求不可用或不一致 请求未包含认证信息 请求中发送的认证密令无权访问目标 URL 对应的资源不存在 指定资源不支持请求使用的方法 处理请求的过程中发生意外错误
HTTP状态码
名  称
说  明
￼￼



示例 14-4 app/main/errors.py:使用 HTTP 内容协商处理错误
     @main.app_errorhandler(404)
     def page_not_found(e):
         if request.accept_mimetypes.accept_json and \
                 not request.accept_mimetypes.accept_html:
             response = jsonify({'error': 'not found'})
             response.status_code = 404
             return response
         return render_template('404.html'), 404



这个新版错误处理程序检查 Accept 请求首部(Werkzeug 将其解码为 request.accept_ mimetypes),根据首部的值决定客户端期望接收的响应格式。浏览器一般不限制响应的格 式,所以只为接受 JSON 格式而不接受 HTML 格式的客户端生成 JSON 格式响应。
其他状态码都由 Web 服务生成,因此可在蓝本的 errors.py 模块作为辅助函数实现。示例 14-5 是 403 错误的处理程序,其他错误处理程序的写法类似。
示例 14-5 app/api_1_0/errors.py:API 蓝本中 403 状态码的错误处理程序
     def forbidden(message):
         response = jsonify({'error': 'forbidden', 'message': message})
         response.status_code = 403
         return response
现在,Web 服务的视图函数可以调用这些辅助函数生成错误响应了。


我们前面说过,REST Web 服务的特征之一是无状态,即服务器在两次请求之间不能“记 住”客户端的任何信息。客户端必须在发出的请求中包含所有必要信息,因此所有请求都 必须包含用户密令。
程序当前的登录功能是在 Flask-Login 的帮助下实现的,可以把数据存储在用户会话中。默 认情况下,Flask 把会话保存在客户端 cookie 中,因此服务器没有保存任何用户相关信息, 都转交给客户端保存。这种实现方式看起来遵守了 REST 架构的无状态要求,但在 REST Web 服务中使用 cookie 有点不现实,因为 Web 浏览器之外的客户端很难提供对 cookie 的 支持。鉴于此,使用 cookie 并不是一个很好的设计选择。

### 只要是http 请求，就都可以携带cookie. 

REST 架构的无状态要求看起来似乎过于严格,但这并不是随意提出的要 求,无状态的服务器伸缩起来更加简单。如果服务器保存了客户端的相关信 息,就必须提供一个所有服务器都能访问的共享缓存,这样才能保证一直使 用同一台服务器处理特定客户端的请求。这样的需求很难实现。


RESTFull 的架构的无状态， 带来了伸缩性方面的便利....


验证回调函数把通过认证的用户保存在 Flask 的全局对象 g 中,如此一来,视图函数便能 进行访问。注意,匿名登录时,这个函数返回 True 并把 Flask-Login 提供的 AnonymousUser 类实例赋值给 g.current_user。

##NOTE: #TODO：
g 是程序上下文。 每个 请求都是重新实现的....



    @api.route('/posts/')
     @auth.login_required
     def get_posts():
pass


### NOTE: 这里的 auth 从哪里来的？


不过,这个蓝本中的所有路由都要使用相同的方式进行保护,所以我们可以在 before_
request 处理程序中使用一次 login_required 修饰器,应用到整个蓝本,如示例 14-8 所示。 示例 14-8 app/api_1_0/authentication.py:在 before_request 处理程序中进行认证
     from .errors import forbidden_error
￼￼￼160 | 第14章
@api.before_request
     @auth.login_required
     def before_request():
if not g.current_user.is_anonymous and \ not g.current_user.confirmed:
return forbidden('Unconfirmed account')
现在,API 蓝本中的所有路由都能进行自动认证。而且作为附加认证,before_request 处
理程序还会拒绝已通过认证但没有确认账户的用户。


基于令牌的认证 每次请求时,客户端都要发送认证密令。为了避免总是发送敏感信息,我们可以提供一种
基于令牌的认证方案。
使用基于令牌的认证方案时,客户端要先把登录密令发送给一个特殊的 URL,从而生成 认证令牌。一旦客户端获得令牌,就可用令牌代替登录密令认证请求。出于安全考虑,令 牌有过期时间。令牌过期后,客户端必须重新发送登录密令以生成新令牌。令牌落入他人 之手所带来的安全隐患受限于令牌的短暂使用期限。为了生成和验证认证令牌,我们要在 User 模型中定义两个新方法。这两个新方法用到了 itsdangerous 包,如示例 14-9 所示。
示例 14-9 app/models.py:支持基于令牌的认证
     class User(db.Model):
         # ...
def generate_auth_token(self, expiration):
s = Serializer(current_app.config['SECRET_KEY'],
                            expires_in=expiration)
             return s.dumps({'id': self.id})
         @staticmethod
         def verify_auth_token(token):
s = Serializer(current_app.config['SECRET_KEY']) try:
                 data = s.loads(token)
             except:
                 return None
             return User.query.get(data['id'])

##NOTE：
就像是一个庞大的生态圈。 

一大堆扩张插件需要被使用...



使用这个技术时,视图函数中得代码可以写得十分简洁明,而且无需检查错误。例如:
     @api.route('/posts/', methods=['POST'])
     def new_post():
         post = Post.from_json(request.json)
         post.author = g.current_user
￼￼164 | 第14章
db.session.add(post)
         db.session.commit()
         return jsonify(post.to_json())



jsonify 如何使用？？？


# p 165....


flask 对日志的处理好糟糕.... 

flask 一定不是我喜欢的框架... 




1、补助405元：每月餐补315元和三次加班补贴90元( 员工手册规定，加班到晚上9点或节假日加班超过4小时的，可报销不超过30元每次的上限)

2、补贴200元：通讯补贴

3、补贴220元：加班交通补贴（员工手册规定，加班到晚上9点后可获得打车补助）



=================



(env)➜  uweb git:(dev) ✗ redis-cli
127.0.0.1:6379> status
(error) ERR unknown command 'status'
127.0.0.1:6379> get 'name'
(nil)
127.0.0.1:6379> set 'name' 'jia'
(error) MISCONF Redis is configured to save RDB snapshots, but is currently not able to persist on disk. Commands that may modify the data set are disabled. Please check Redis logs for details about the error.
127.0.0.1:6379>









王垠；
http://www.zhihu.com/question/20822815


(env)➜  uweb git:(dev) ✗ find . -type f -name '*.pyc' |xargs  rm
(env)➜  uweb git:(dev) ✗ find . -type f -name '*.pyc'



$ git remote update
Fetching origin

$ git pull



 git reset --soft a8c7b123b9b144ee9da07115e3806f5982acf9d2


 区别：？？？

【转】git reset 之 soft mixed hard选项的区别

http://blog.sina.com.cn/s/blog_936739790102v3nk.html





python 编程规范：

Python 编程规范
http://blog.csdn.net/waterforest_pang/article/details/25226129

简介：

举例：

不要使用反斜杠连接行.

Python会将 圆括号, 中括号和花括号中的行隐式的连接起来 , 你可以利用这个特点. 如果需要, 你可以在表达式外围增加一对额外的圆括号.







sqlalchemy:

Python SQLAlchemy基本操作和常用技巧（包含大量实例,非常好）
http://www.jb51.net/article/49789.htm
简介：
xxxx









python file
文件的创建，读取，写入，修改，删除---python入门:
http://blog.163.com/jackylau_v/blog/static/175754040201181505158356/


Python教程：[51]删除文件及文件夹
http://jingyan.baidu.com/article/39810a23e80384b636fda639.html
简介：

os.remove('xxxx')

删除一个空文件会报错， 所以需要先检测一下：
os.path.exists('xxxx')


删除空文件夹。
os.rmdir('xxxx')


可以直接删除非空文件夹：
import shutil
shutil.rmtree('xxxx')





sublime 快捷键：

Ctrl+D 选词 （反复按快捷键，即可继续向下同时选中下一个相同的文本进行同时编辑）
Ctrl+G 跳转到相应的行
Ctrl+J 合并行（已选择需要合并的多行时）
Ctrl+L 选择整行（按住-继续选择下行）
Ctrl+M 光标移动至括号内开始或结束的位置
Ctrl+T 词互换
Ctrl+U 软撤销
Ctrl+P 查找当前项目中的文件和快速搜索；输入 @ 查找文件主标题/函数；或者输入 : 跳转到文件某行；
Ctrl+R 快速列出/跳转到某个函数
Ctrl+K Backspace 从光标处删除至行首
Ctrl+KB 开启/关闭侧边栏
Ctrl+KK 从光标处删除至行尾
Ctrl+KT 折叠属性
Ctrl+KU 改为大写
Ctrl+KL 改为小写
Ctrl+K0 展开所有
Ctrl+Enter 插入行后（快速换行）
Ctrl+Tab 当前窗口中的标签页切换



Sublime Text 2 快捷键用法大全(转)
http://www.cnblogs.com/samwu/archive/2013/02/22/2922926.html



如何关闭Linux系统中的SELinux功能

http://jingyan.baidu.com/article/da1091fb3f6389027849d685.html




VirtualBox 安装 CentOs 6.3图文详细教程

http://www.jishuzh.com/software/pc/vbox-install-centos-6-3-tips-with-img.html




python的requests初步使用
http://my.oschina.net/yangyanxing/blog/280029





程序员需要多个显示器来提高工作效率
http://www.codeceo.com/article/programmer-mult-monitors.html

码农网：
http://www.codeceo.com/





尝试新技术：




度秘：


官网：
http://dumi.baidu.com/


如何评价 2015 年 9 月 8 日百度世界大会上推出的机器人助理「度秘」？
http://www.zhihu.com/question/35450254/answer/62957136
简介：

在百度世界大会上，百度发布秘书化搜索，宣布开启智能服务时代。

所谓秘书化搜索，就是在索引真实世界的基础上，让用户获取服务的最佳方式，小度机器人即是百度秘书化搜索的载体。除了实体版的度秘，在百度搜索PC端、手机百度上均有虚拟形态的小度机器人，可以为用户提供各种智能服务。


比较了百度的度秘和微软小冰。



foreman架构的引入1-foreman作为自动化运维工具为什么会如此强大
http://dreamfire.blog.51cto.com/418026/1542171/




Foreman 安装配置及使用技巧(3)
http://os.51cto.com/art/201307/402207_2.htm


观点 | Docker根本不适合用于本地开发环境
http://dockone.io/article/660



Linux 各目录及每个目录的详细介绍

http://blog.csdn.net/byply/article/details/48339341?ref=myread




flask 问题：

问题：
其实就是运行这行代码是有时正常，有时报错： 
from flask.ext.sqlalchemy import SQLAlchemy 


from flask.ext.sqlalchemy import SQLAlchemy 
ImportError: No module named ext.sqlalchemy 

求助，关于引入flask_SQLAlchemy
http://www.douban.com/group/topic/30908026/


是这样，因为sae自带了sqlalchemy模块，所以本地不需要装，就可以在sae上用，但是sae的ext模块是在flaskext下，所以要上传到sae上可用，需要在wsgi里面 

from flaskext.sqlalchemy import SQLAlchemy 

但是在本地环境，flask的所有外部包是放在ext下面的，所以如果要使用sqlalchemy，需要 

from flask.ext.sqlalchemy import SQLAlchemy 

如何让两者统一？一个方法是直接在sae上新装一个flask，整个替换掉原有flask（或者修改掉ext目录设置，这个没试过） 

另一个方法是在import的时候做一个判断 

比如 
try: 
from flaskext.sqlalchemy import SQLAlchemy 
except: 
from flask.ext.sqlalchemy import SQLAlchemy



“欲戴王冠，必承其重”“别低头！皇冠会掉！别流泪！坏人会笑！”


基于Python+Tornado框架的CMS，功能比较完整了，欢迎多提意见。
https://github.com/bukun/TorCMS

另外最近修改原来做的一个分类网站，也开源了，现在可以运行，但改动会比较大。同样基于Python+Tornaod:
https://github.com/bukun/pycate






$ curl -i  -H "Content-type: application/json"  -X POST -d  '{"name":"jia"}' http://localhost:6101/api/1/luckyair/user/






建站 ABC:
http://www.ev123.net/reg.php?Version=2014
http://www.ev123.net/shangcheng.php
user:jiaxiaolei1987
psd: jia7758521



凡科建站
http://www.faisco.cn
登录地址：http://www.faisco.cn
凡科帐号：jiaxiaolei1987flower
员工帐号：boss
psd: jia7758521



@技术-李浩 
http://www.aihuaju.com/
浩哥，评估下 做一个类似的 平台大概需要多久？最经济的方式是什么样？

使用快速建站平台可行性如何？
找外包的话有推荐的吗？

@other
其他筒子们有什么建议？




http://baichuan.taobao.com/
百川是阿里巴巴旗下的无线开放平台，基于世界级的后端服务和成熟的商业组件，
快速搭建App和提供卓越用户体验，开拓广告、商品、生活服务等无线新商业

主要是做 demo. 




Content-Type: application/json; charset=utf-8 
Content-Length: 21 
Server: Werkzeug/0.10.4 Python/2.7.6 
Date: Sat, 12 Sep 2015 07:17:13 GMT 






    # return 'aaaajia'
    # return jsonify({'result':'jia'})
    # return {'result':'jia'}



Qt[1]  是一个1991年由奇趣科技开发的跨平台C++图形用户界面应用程序开发框架。

http://baike.baidu.com/link?url=VNzAq89UOHk4LdQ6KPiHiOP6kvl__gtKfwjKUmVsmm0Tv_DSX6ZZApFfqQPzVw3oy9sTSe0PQY8dc7BReY-Aea
简介：
QT 游戏比较....



http://www.boyunjian.com/v/softd/jieba.html

jieba

"结巴"中文分词：做最好的Python中文分词组件 "Jieba" 
Feature

支持三种分词模式： 精确模式，试图将句子最精确地切开，适合文本分析； 全模式，把句子中所有的可以成词的词语都扫描出来, 速度非常快，但是不能解决歧义； 搜索引擎模式，在精确模式的基础上，对长词再次切分，提高召回率，适合用于搜索引擎分词。 
支持繁体分词 
支持自定义词典


在线demo:
http://jiebademo.ap01.aws.af.cm/extract




问题：

Building prefix dict from /Users/jiaxiaolei/Documents/py3_001/lib/python2.7/site-packages/jieba/dict.txt ...
Dumping model to file cache /var/folders/yv/qkq6sqns7cb3z3sqhcp60x9m0000gn/T/jieba.cache
Loading model cost 1.738 seconds.
Prefix dict has been built succesfully.
Traceback (most recent call last):
  File "script_init_env.py", line 55, in <module>
    build_whoosh_database()
  File "script_init_env.py", line 49, in build_whoosh_database
    content= text2
  File "/Users/jiaxiaolei/Documents/py3_001/lib/python2.7/site-packages/whoosh/writing.py", line 750, in add_document
    for tbytes, freq, weight, vbytes in items:
  File "/Users/jiaxiaolei/Documents/py3_001/lib/python2.7/site-packages/whoosh/fields.py", line 156, in index
    raise ValueError("%r is not unicode or sequence" % value)
ValueError: '/post/1000.html' is not unicode or sequence




>>> os.path.join('/xxx/yy', 'jia')
'/xxx/yy/jia'
>>> os.path.join('/xxx/yy', '/jia')
'/jia'



===========



MariaDB数据库管理系统是MySQL的一个分支，主要由开源社区在维护，采用GPL授权许可 MariaDB的目的是完全兼容MySQL，包括API和命令行，使之能轻松成为MySQL的代替品。在存储引擎方面，使用XtraDB（英语：XtraDB）来代替MySQL的InnoDB。 MariaDB由MySQL的创始人Michael Widenius（英语：Michael Widenius）主导开发，他早前曾以10亿美元的价格，将自己创建的公司MySQL AB卖给了SUN，此后，随着SUN被甲骨文收购，MySQL的所有权也落入Oracle的手中。MariaDB名称来自Michael Widenius的女儿Maria的名字。


http://blog.it985.com/753.html
git 查看远程分支、本地分支、删除本地分支






