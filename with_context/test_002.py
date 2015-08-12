# -*- coding:utf8 -*-


from contextlib import contextmanager
 
"""contextmanager 必须 和 yield 联系在一起。

如果用yield 替换成 return, 则返回：

Traceback (most recent call last):
  File "test_002.py", line 14, in <module>
    with make_context() as value :
  File "/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/contextlib.py", line 17, in __enter__
    return self.gen.next()
AttributeError: 'dict' object has no attribute 'next'

"""

@contextmanager
def make_context() :
    print 'enter'
    try :
        yield {}
        # return {}
    except RuntimeError, err :
        print 'error' , err
    finally :
        print 'exit'
  
with make_context() as value :
    print value