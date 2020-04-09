
import time

import redis
from redis.sentinel import Sentinel


sentinel = Sentinel([

    ('10.122.69.151', 26379),
    ('10.122.69.152', 6379),
    ('10.122.69.153', 6379),
    ],
    socket_timeout=0.5)

 
sentinel_name = 'sentinel10.122.69.151'
master = sentinel.discover_master(sentinel_name)
print('master: ',  master)

master = sentinel.master_for(sentinel_name, socket_timeout=0.5, password='8ik,9ol.')
#master = sentinel.master_for(sentinel_name, socket_timeout=0.5, password='8ik,9ol.', db=15)
w_ret = master.set('foo', 'barjiatest' )
print('w_ret: ', w_ret)

r_ret = master.get('foo')
print('r_ret: ', r_ret)

w_ret = master.expire('foo', 30)
print('w_ret: ', w_ret)

for i in range(10):
    r_ret = master.get('foo')
    print('r_ret: ', r_ret)
    time.sleep(5)


slave = sentinel.discover_slaves(sentinel_name)
print('slave: ', slave)


#slave = sentinel.slave_for(sentinel_name , socket_timeout=0.1)
#value = slave.get('wu')
#print('value: ', value)
