

Flask 学习：
=====


github:
https://github.com/mitsuhiko/flask.git



欢迎来到 Flask 的世界
http://dormousehole.readthedocs.org/en/latest/
简介：
很好的一个中文介绍页面。 



书籍参考：
ftp://192.168.2.240/%BB%A5%C1%AA%CD%F8%B2%BF/Flask%20Web%BF%AA%B7%A2%A3%BA%BB%F9%D3%DAPython%B5%C4Web%D3%A6%D3%C3%BF%AA%B7%A2%CA%B5%D5%BD.pdf



Tornado与flask的特点和区别有哪些？
http://www.zhihu.com/question/21295501



#NOTE:
简介

相对来说，flask比较简单，flask用的几个核心库都是相同的作者开发的，有保证，如果想入门，从flask入门比较不错。而且，flask的资料也非常多，Github有很多使用flask的开源项目。

我简单的对比了一下Tornado和Flask，其中Tornado我用的不多，只是看过文档：
Tornado大了一点说其实应该算是一个异步框架和Web框架，Web框架是其中的一部分功能；flask则更加简单一些，就是一个Web框架。


我觉得你用flask就可以，因为这3个框架里，falsk无疑是最简单的。
Django过于复杂和封闭，他的orm我估计你也用不上。
tornado的并发处理比flask强，但是你对并发没要求。
就简单灵活易用来说，用flask是比较合适的。
另外一点flask的文档和扩展都比tornado要好。


做博客，我倒是支持用django，因为博客只要写好一个model之后，剩下的就是html这些前段模板的工作了。
flask是没有原生的数据层面的东西，很多人都是将它配合SQLAlchemy来使用，django自带orm。
不过这个问题是针对题主你个人情况啦，如果你对SQL很熟悉，或者已经掌握了一些如SQLAlchemy之类的orm框架，flask用起来也不难。
flask框架是建立于你已经对python各种web框架，以及Python这一门语言已经有较深理解情况下使用的。你以为flask真的就只是flask一个部分吗？jinja2你要不要学？Werkzeug要不要学？这些都是flask的依赖库啊。
反正flask跟django都有一个建立网络博客的教程，你倒可以学习学习，然后再看适合用哪个。至于Tornado不是用来搞什么TCP server的吗，只是写个博客而已，用这些异步框架不太合适吧。

#NOTE:
阅读总结：
这里提到了jingjia， Werkzeug, 依赖外部... 所以

按照惯例，模板和静态文件 存放在应用的 Python 源代码树的子目录中，名称分别为 templates 和 static 。


Flask 中的本地线程对象
Flask 的设计原则之一是简单的任务不应当使用很多代码，应当可以简单地完成，但同时 又不应当把程序员限制得太死。因此，一些 Flask 的设计思路可能会让某些人觉得吃惊， 或者不可思议。例如， Flask 内部使用本地线程对象，这样就可以不用为了线程安全的 缘故在同一个请求中在函数之间传递对象。这种实现方法是非常便利的，但是当用于附属 注入或者当尝试重用使用与请求挂钩的值的代码时，需要一个合法的环境。 Flask 项目 对于本地线程是直言不讳的，没有一点隐藏的意思，并且在使用本地线程时在代码中进行 了标注和说明。


做网络开发时要谨慎

做网络应用开发时，安全要永记在心。

如果你开发了一个网络应用，那么可能会让用户注册并把他们的数据保存在服务器上。 用户把数据托付给了你。哪怕你的应用只是给自己用的，你也会希望数据完好无损。

不幸的是，网络应用的安全性是千疮百孔的，可以攻击的方法太多了。 Flask 可以防御 现代 Web 应用最常见的安全攻击：跨站代码攻击（ XSS ）。 Flask 和 下层的 Jinja2 模板引擎会保护你免受这种攻击，除非故意把不安全的 HTML 代码放进来。但是安全攻击 的方法依然还有很多。

#NOTE:  这里提到了 “如何编写向前兼容的 Python 代码 。”



安装

Flask 依赖两个外部库： Werkzeug 和 Jinja2 。Werkzeug 是一个 WSGI 套件。 WSGI 是 Web 应用与 多种服务器之间的标准 Python 接口，即用于开发，也用于部署。 Jinja2 是用于渲染 模板的。

#NOTE:
这里把 wsgi 和 渲染“外包”给了别人...



Virtualenv 就是救星！它的基本原理是为每个项目安装一套 Python ，多套 Python 并存。但它不是真正地安装多套独立的 Python 拷贝，而是使用了一种巧妙的方法让不同 的项目处于各自独立的环境中。让我们来看看 virtualenv 是如何运行的！

如果你使用 Mac OS X 或 Linux ，那么可以使用下面两条命令中任意一条:

$ sudo easy_install virtualenv
或更高级的:

$ sudo pip install virtualenv

也可以使用软件包管理器，在 Ubuntu 系统中可以试试:

$ sudo apt-get install python-virtualenv

这里推荐的策略是： 

每次需要使用项目时，必须先激活相应的环境。在 OS X 和 Linux 系统中运行:

$ . venv/bin/activate


另外一个可选的策略是：
可以 用 env 中的绝对路径，或者给 env 加一个软连接...


全局安装...


##NOTE: 视野开阔...

如果你想要使用最新版的 Flask ，那么有两种方法：要么使用 pip 安装开发版本， 要么使用 git 检索。无论哪种方法，都推荐使用 virtualenv 。


一个应用举例：使用git 获取最新版

$ git clone http://github.com/mitsuhiko/flask.git
Initialized empty Git repository in ~/dev/flask/.git/
$ cd flask
$ virtualenv venv --distribute
New python executable in venv/bin/python
Installing distribute............done.
$ . venv/bin/activate
$ python setup.py develop
...
Finished processing dependencies for Flask

#NOTE：
解释：
$ virtualenv venv --distribute


使用 pip 获取开发版：

$ mkdir flask
$ cd flask
$ virtualenv venv --distribute
$ . venv/bin/activate
New python executable in venv/bin/python
Installing distribute............done.
$ pip install Flask==dev
...
Finished processing dependencies for Flask==dev


#NOTE:
一个最简单的 flask 应用。 比tornado 简单...

一个最小的 Flask 应用如下:

from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'

if __name__ == '__main__':
    app.run()
把它保存为 hello.py 或其他类似名称并用你的 Python 解释器运行这个文件。请不要 使用 flask.py 作为应用名称，这会与 Flask 本身发生冲突。

$ python hello.py
 * Running on http://127.0.0.1:5000/
现在，在浏览器中打开 http://127.0.0.1:5000/ ，就 可以看到问候页面了。


#NOTE:

app = Flask(__name__)
的具体了解...

第一个参数是应用模块或者包的名称。如果你使用一个 单一模块（就像本例），那么应当使用 __name__ ，因为名称会根据这个模块是按 应用方式使用还是作为一个模块导入而发生变化（可能是 '__main__' ，也可能是 实际导入的名称）。这个参数是必需的，这样 Flask 就可以知道在哪里找到模板和 静态文件等东西。更多内容详见 Flask 文档。



if __name__ == '__main__': 确保服务器只会在使用 Python 解释器运行代码的 情况下运行，而不会在作为模块导入时运行。


#NOTE:
问题： 默认情况下flask，app.run() 只在本地 localhost 5000 启动了服务。


#NOTE: 调试模式
虽然 run() 方法可以方便地启动一个本地开发服务器，但是每次 修改应用之后都需要手动重启服务器。这样不是很方便， Flask 可以做得更好。如果你 打开调试模式，那么服务器会在修改应用之后自动重启，并且当应用出错时还会提供一个 有用的调试器。

打开调试模式有两种方法，一种是在应用对象上设置标志:

app.debug = True
app.run()
另一种是作为参数传递给 run 方法:

app.run(debug=True)



#NOTE: 外部可见的服务器。
运行服务器后，会发现只有你自己的电脑可以使用服务，而网络中的其他电脑却不行。 缺省设置就是这样的，因为在调试模式下该应用的用户可以执行你电脑中的任意 Python 代码。

如果你关闭了 调试 或信任你网络中的用户，那么可以让服务器被公开访问。只要像 这样改变 run() 方法的调用:

app.run(host='0.0.0.0')
这行代码告诉你的操作系统监听一个公开的 IP 。




路由
现代 web 应用都使用漂亮的 URL ，有助于人们记忆，对于使用网速较慢的移动设备尤其 有利。如果用户可以不通过点击首页而直达所需要的页面，那么这个网页会更得到用户的 青睐，提高回头率。

如前文所述， route() 装饰器用于把一个函数绑定到一个 URL 。 下面是一些基本的例子:

@app.route('/')
def index():



    return 'Index Page'

@app.route('/hello')
def hello():
    return 'Hello World'




变量规则
=====
通过把 URL 的一部分标记为 <variable_name> 就可以在 URL 中添加变量。标记的 部分会作为关键字参数传递给函数。通过使用 <converter:variable_name> ，可以 选择性的加上一个转换器，为变量指定规则。请看下面的例子:

@app.route('/user/<username>')
def show_user_profile(username):
    # show the user profile for that user
    return 'User %s' % username

@app.route('/post/<int:post_id>')
def show_post(post_id):
    # show the post with the given id, the id is an integer
    return 'Post %d' % post_id
现有的转换器有：

int	接受整数
float	接受浮点数
path	和缺省情况相同，但也接受斜杠



唯一的 URL / 重定向行为
Flask 的 URL 规则都是基于 Werkzeug 的路由模块的。其背后的理念是保证漂亮的 外观和唯一的 URL 。这个理念来自于 Apache 和更早期的服务器。

假设有如下两条规则:



@app.route('/projects/')
def projects():
    return 'The project page'

@app.route('/about')
def about():
    return 'The about page'
它们看上去很相近，不同之处在于 URL 定义 中尾部的斜杠。第一个例子中 prjects 的 URL 是中规中举的，尾部有一个斜杠，看起来就如同一个文件夹。访问 一个没有斜杠结尾的 URL 时 Flask 会自动进行重定向，帮你在尾部加上一个斜杠。

但是在第二个例子中， URL 没有尾部斜杠，因此其行为表现与一个文件类似。如果 访问这个 URL 时添加了尾部斜杠就会得到一个 404 错误。

为什么这样做？因为这样可以在省略末尾斜杠时仍能继续相关的 URL 。这种重定向 行为与 Apache 和其他服务器一致。同时， URL 仍保持唯一，帮助搜索引擎不重复 索引同一页面。


尾部默认是没有 / 的。



#NOTE: 举例：http://xxxxx/test1 --> http://xxxx/test1/
@app.route('/test1/')
def test1():
    return 'test1 --Jia Xiaolei'

#NOTE: http://xxxx/test2
@app.route('/test2')
def test2():
    return 'test2 --Jia Xiaolei'

#NOTE: http://xxxx/test2/
@app.route('/test2/')
def test22():
    return 'test22 with slash --Jia Xiaolei'



总结：
最常见的用法是：

浏览器： http://xxxx/url or http://xxx/url/
router: @app.route('/url/')


如果 router 提供了

@app.route('/url') @app.rout('/url/')

则在浏览器端需要严格匹配。 




URL 构建
如果可以匹配 URL ，那么 Flask 也可以生成 URL 吗？当然可以。 url_for() 函数就是用于构建指定函数的 URL 的。它把函数名称作为 第一个参数，其余参数对应 URL 中的变量。未知变量将添加到 URL 中作为查询参数。 例如：

>>> from flask import Flask, url_for
>>> app = Flask(__name__)
>>> @app.route('/')
... def index(): pass
...
>>> @app.route('/login')
... def login(): pass
...
>>> @app.route('/user/<username>')
... def profile(username): pass
...
>>> with app.test_request_context():
...  print url_for('index')
...  print url_for('login')
...  print url_for('login', next='/')
...  print url_for('profile', username='John Doe')
...
/
/login
/login?next=/
/user/John%20Doe
（例子中还使用下文要讲到的 test_request_context() 方法。这个 方法的作用是告诉 Flask 我们正在处理一个请求，而实际上也许我们正处在交互 Python shell 之中，并没有真正的请求。详见下面的 本地环境 ）。

为什么不在把 URL 写死在模板中，反而要动态构建？有三个很好的理由：

反向解析通常比硬编码 URL 更直观。同时，更重要的是你可以只在一个地方改变 URL ，而不用到处乱找。
URL 创建会为你处理特殊字符的转义和 Unicode 数据，不用你操心。
如果你的应用是放在 URL 根路径之外的地方（如在 /myapplication 中，不在 / 中）， url_for() 会为你妥善处理。

#NOTE：
看 URL 的构建....



HTTP 方法
HTTP （ web 应用使用的协议）) 协议中有访问 URL 的不同方法。缺省情况下，一个路由 只回应 GET 请求，但是可以通过 methods 参数使用不同方法。例如:

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        do_the_login()
    else:
        show_the_login_form()
如果当前使用的是 GET 方法，会自动添加 HEAD ，你不必亲自操刀。同时还会确保 HEAD 请求按照 HTTP RFC （说明 HTTP 协议的文档）的要求来处理，因此你可以 完全忽略这部分 HTTP 规范。与 Flask 0.6 一样， OPTIONS 自动为你处理好。

完全不懂 HTTP 方法？没关系，这里给你速成培训一下：

HTTP 方法（通常也被称为“动作”）告诉服务器一个页面请求要 做 什么。以下是常见 的方法：

GET
浏览器告诉服务器只要 得到 页面上的信息并发送这些信息。这可能是最常见的 方法。
HEAD
浏览器告诉服务器想要得到信息，但是只要得到 信息头 就行了，页面内容不要。 一个应用应该像接受到一个 GET 请求一样运行，但是不传递实际的内容。在 Flask 中，你根本不必理会这个，下层的 Werkzeug 库会为你处理好。
POST
浏览器告诉服务器想要向 URL 发表 一些新的信息，服务器必须确保数据被保存好 且只保存了一次。 HTML 表单实际上就是使用这个访求向服务器传送数据的。
PUT
与 POST 方法类似，不同的是服务器可能触发多次储存过程而把旧的值覆盖掉。你 可能会问这样做有什么用？这样做是有原因的。假设在传输过程中连接丢失的情况 下，一个处于浏览器和服务器之间的系统可以在不中断的情况下安全地接收第二次 请求。在这种情况下，使用 POST 方法就无法做到了，因为它只被触发一次。
DELETE
删除给定位置的信息。
OPTIONS
为客户端提供一个查询 URL 支持哪些方法的捷径。从 Flask 0.6 开始，自动为你 实现了这个方法。
有趣的是在 HTML4 和 XHTML1 中，表单只能使用 GET 和 POST 方法。但是 JavaScript 和未来的 HTML 标准中可以使用其他的方法。此外， HTTP 近来已经变得相当 流行，浏览器不再只是唯一使用 HTTP 的客户端。比如许多版本控制系统也使用 HTTP 。


#NOTE:
这里聊天，很有意思....

这里对 url + method 的处理很有意思...



HTTP协议中GET、POST和HEAD的介绍
GET： 请求指定的页面信息，并返回实体主体。
HEAD： 只请求页面的首部。
POST： 请求服务器接受所指定的文档作为对所标识的URI的新的从属实体。


静态文件
======
动态的 web 应用也需要静态文件，一般是 CSS 和 JavaScript 文件。理想情况下你的 服务器已经配置好了为你的提供静态文件的服务。在开发过程中， Flask 也能做好这个 工作。只要在你的包或模块旁边创建一个名为 static 的文件夹就行了。静态文件位于 应用的 /static 中。

使用选定的 'static' 端点就可以生成相应的 URL 。:

url_for('static', filename='style.css')
这个静态文件在文件系统中的位置应该是 static/style.css 。




渲染模板
======
在 Python 内部生成 HTML 不好玩，且相当笨拙。因为你必须自己负责 HTML 转义，以 确保应用的安全。因此， Flask 自动为你配置的 Jinja2 模板引擎。

使用 render_template() 方法可以渲染模板，你只要提供模板名称和需要 作为参数传递给模板的变量就行了。下面是一个简单的模板渲染例子:

from flask import render_template

@app.route('/hello/')
@app.route('/hello/<name>')
def hello(name=None):
    return `render_template`('hello.html', name=name)



Flask 会在 templates 文件夹内寻找模板。因此，如果你的应用是一个模块，那么模板 文件夹应该在模块旁边；如果是一个包，那么就应该在包里面：

情形 1: 一个模块:

/application.py
/templates
    /hello.html
情形 2: 一个包:

/application
    /__init__.py
    /templates
        /hello.html



你可以充分使用 Jinja2 模板引擎的威力。更多内容，详见官方 Jinja2 模板文档 。

模板举例：
-----

##### flask 把模板渲染都交给了jinja2., 
##### tornado 是自己实现的。 

<!doctype html>
<title>Hello from Flask</title>
{% if name %}
  <h1>Hello {{ name }}!</h1>
{% else %}
  <h1>Hello World!</h1>
{% endif %}
在模板内部你也可以访问 request 、session 和 g [1] 对象，以及 get_flashed_messages() 函数。

模板在继承使用的情况下尤其有用，其工作原理 模板继承 方案 文档。简单的说，模板继承可以使每个页面的特定元素（如页头，导航，页尾）保持 一致。

自动转义默认开启。因此，如果 name 包含 HTML ，那么会被自动转义。如果你可以 信任某个变量，且知道它是安全的 HTML （例如变量来自一个把 wiki 标记转换为 HTML 的模块），那么可以使用 Markup 类把它标记为安全的。否则请在模板 中使用 |safe 过滤器。更多例子参见 Jinja 2 文档。


下面简单介绍一下 Markup 类的工作方式：

>>> from flask import Markup
>>> Markup('<strong>Hello %s!</strong>') % '<blink>hacker</blink>'
Markup(u'<strong>Hello &lt;blink&gt;hacker&lt;/blink&gt;!</strong>')
>>> Markup.escape('<blink>hacker</blink>')
Markup(u'&lt;blink&gt;hacker&lt;/blink&gt;')
>>> Markup('<em>Marked up</em> &raquo; HTML').striptags()
u'Marked up \xbb HTML'
Changed in version 0.5: 自动转义不再为所有模板开启，只为扩展名为 .html 、 .htm 、 .xml 和 .xhtml 开启。从字符串载入的模板将关闭自动转义。

##### 这里类似tornado 对html 字符的转义。
ß

[1]	不理解什么是 g 对象？它是某个可以根据需要储存信息的 东西。更多信息参见 g 对象的文档和 在 Flask 中使用 SQLite 3 文档。


#NOTE: 这里需要多花些精力...



# followup:
操作请求数据

http://dormousehole.readthedocs.org/en/latest/errorhandling.html#working-with-debuggers

全局 对象 request 来提供请求信息


本地环境
内部信息
如果你想了解其工作原理和如何测试，请阅读本节，否则可以跳过本节。
某些对象在 Flask 中是全局对象，但是不是通常意义下的全局对象。这些对象实际上是 特定环境下本地对象的代理。真拗口！但还是很容易理解的。

设想现在处于处理线程的环境中。一个请求进来了，服务器决定生成一个新线程（或者 叫其他什么名称的东西，这个下层的东西能够处理包括线程在内的并发系统）。当 Flask 开始其内部请求处理时会把当前线程作为活动环境，并把当前应用和 WSGI 环境 绑定到这个环境（线程）。它以一种聪明的方式使得一个应用可以在不中断的情况下 调用另一个应用。

这对你有什么用？基本上你可以完全不必理会。这个只有在做单元测试时才有用。在测试 时会遇到由于没有请求对象而导致依赖于请求的代码会突然崩溃的情况。对策是自己创建 一个请求对象并绑定到环境。最简单的单元测试解决方案是使用 test_request_context() 环境管理器。通过使用 with 语句可以 绑定一个测试请求，以便于交互。例如:

from flask import request

with app.test_request_context('/hello', method='POST'):
    # now you can do something with the request until the
    # end of the with block, such as basic assertions:
    assert request.path == '/hello'
    assert request.method == 'POST'
另一种方式是把整个 WSGI 环境传递给 request_context() 方法:

from flask import request

with app.request_context(environ):
    assert request.method == 'POST'
    
    
    
    
重定向和错误
===========
使用 redirect() 函数可以重定向。使用 abort() 可以更早 退出请求，并返回错误代码:

from flask import abort, redirect, url_for

@app.route('/')
def index():
    return redirect(url_for('login'))

@app.route('/login')
def login():
    abort(401)
    this_is_never_executed()

#NOTE: 
这里的abort 挺好的， 




使用调试器
为了更深入的挖掘错误，追踪代码的执行， Flask 提供一个开箱即用的调试器（参见 调试模式 ）。如果你需要使用其他 Python 调试器，请注意调试器之间的干扰 问题。在使用你自己的调试器前要做一些参数调整：

debug - 是否开启调试模式并捕捉异常
use_debugger - 是否使用 Flask 内建的调试器
use_reloader - 出现异常后是否重载或者派生进程
debug 必须设置为 True （即必须捕获异常），另两个随便。

如果你正在使用 Aptana 或 Eclipse 排错，那么 use_debugger 和 use_reloader 都必须设置为 False 。












#NOTE: 
这里的渲染模板比较有意思， 和tornado 的一样....

### 学习东西的感觉真好...







Python六大开源框架对比：Web2py略胜一筹
http://www.csdn.net/article/2013-08-08/2816494-6-pillars-of-python-assessment-of-best-python-web-frameworks
#NOTE：
竟然没有写tornado, flask。。。 



=========
常见问题：
http://dormousehole.readthedocs.org/en/latest/errorhandling.html#working-with-debuggers






@module.route('/api/1/news/news/', methods=['GET', 'POST'])
def api_news_news():
    """Provide all the categorys of news.


      File "/Users/jiaxiaolei/Documents/env/lib/python2.7/site-packages/flask/app.py", line 976, in add_url_rule
    rule = self.url_rule_class(rule, methods=methods, **options)
  File "/Users/jiaxiaolei/Documents/env/lib/python2.7/site-packages/werkzeug/routing.py", line 540, in __init__
    raise ValueError('urls must start with a leading slash')
ValueError: urls must start with a leading slash




