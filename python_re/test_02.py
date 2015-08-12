# -*- coding:utf8 -*-

from bs4 import BeautifulSoup

c = '<a>这是一个超链接.</a><p>if want more, </p><a href="www.baidu.com">click it</a>'

tst = ''.join(BeautifulSoup(c).findAll(text=True))
print '---tst', tst
