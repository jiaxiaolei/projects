# -*- coding:utf-8 -*-


"""

new  和 init  的区别？


自己彻底分析单例模式... !!!!


"""


"""
用__new__来实现单例
http://my.oschina.net/leejun2005/blog/207371

python version: py2 

"""

class Singleton(object):
    def __new__(cls):
        # 关键在于这，每一次实例化的时候，我们都只会返回这同一个instance对象
        if not hasattr(cls, 'instance'):
            cls.instance = super(Singleton, cls).__new__(cls)
        return cls.instance


obj1 = Singleton()
obj2 = Singleton()

print 'id(obj1)', id(obj1)
print 'id(obj2)', id(obj2)


obj1.attr1 = 'value1'
print obj1.attr1, obj2.attr1
print obj1 is obj2
