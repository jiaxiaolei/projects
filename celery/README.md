
Usage:
========

启动服务:
$ celery -A tasks worker --loglevel=info


$ celery worker -A tasks -E -B -s /tmp/celerrbeat-schedule -l INFO


>>> from tasks import sendmail
>>> sendmail.delay(dict(to='celery@python.org'))
<AsyncResult: 79216005-c2a5-4fc4-8300-10a399b7a35d>


output:

[2015-08-27 15:39:29,074: INFO/MainProcess] Received task: tasks.sendmail[79216005-c2a5-4fc4-8300-10a399b7a35d]
[2015-08-27 15:39:29,075: WARNING/Worker-6] sending mail to celery@python.org...
[2015-08-27 15:39:31,076: WARNING/Worker-6] mail sent.
[2015-08-27 15:39:31,077: INFO/MainProcess] Task tasks.sendmail[79216005-c2a5-4fc4-8300-10a399b7a35d] succeeded in 2.00202940902s: None



REF
======


http://www.liaoxuefeng.com/article/00137760323922531a8582c08814fb09e9930cede45e3cc000

