# -*-coding:utf8-*-
import re  

html = '<a>这是一个超链接.</a><p>if want more, </p><a href="www.baidu.com">click it</a>'

#html = '<pre class="line mt-10 q-content" accuse="qContent">目的是通过第一次soup.find按class粗略筛选并通过soup.find_all筛选出列表中的a标签并读入href和title属性<br><br>但是由于目标链接可能有图片链接,而这是我不想要的.请问如何去除?<br></pre>' 

# ..
#reg = re.compile(r'<.*>')  
#reg = re.compile(r'<.*?>')  

# 所有的标签都被移除...
# < 除了>之外的所有字符  >
#reg = re.compile(r'<[^>]*>')  
#reg = re.compile(r'<[/a]*>')  

# okay
#reg = re.compile(r'</?a+[^>]*>')  
# okay
#reg = re.compile(r'(<a.*?>|</a>)')  

# remove </a> is okay
#reg = re.compile(r'</a>')  
#reg = re.compile('<[^>]*>')  
  
print(reg.sub('',html))  
