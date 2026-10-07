#coding:utf-8

from django.http import HttpResponse

def index(request):
     return HttpResponse(u"欢迎光临 自强学堂!")

