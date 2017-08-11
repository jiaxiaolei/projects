#!/usr/bin/env python
# coding=utf-8

from pymongo import MongoClient
from pymongo import ReadPreference

# single mongo
#c = MongoClient(host="mongo-1", port=28010) # okay
#c = MongoClient('mongodb://admin:123456@mongo-1:28010,mongo-2:28010/?replicaSet=rsname')

# mongo cluster 
#c = MongoClient('mongodb://admin:123456@mongo-1:28010,mongo-2:28010,mongo-3:28010')
c = MongoClient('mongodb://admin:123456@mongo-1:28010,mongo-2:28010,mongo-3:28010',read_preference=ReadPreference.SECONDARY, slave_okay=True)
#c = MongoClient('mongodb://admin:123456@mongo-1:28010,mongo-2:28010,mongo-3:28010',read_preference=ReadPreference.NEAREST)
#c = MongoClient('mongodb://admin:123456@mongo-1:28010,mongo-2:28010,mongo-3:28010/?readPreference=secondary')
#c = MongoClient('mongodb://admin:123456@mongo-3:28010/?readPreference=secondary')

print c.nodes
print c.database_names()
