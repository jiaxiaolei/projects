#!/usr/bin/env python
# coding=utf-8

from pymongo import MongoClient
#c = MongoClient(host="mongo-1", port=28010)
#c = MongoClient('mongodb://admin:123456@mongo-1:28010,mongo-2:28010/?replicaSet=rsname')
# okay
c = MongoClient('mongodb://admin:123456@mongo-1:28010,mongo-2:28010,mongo-3:28010')
#c = MongoClient('mongodb://admin:123456@mongo-1:28010,mongo-2:28010,mongo-3:28010/?readPreference=secondary')
#c = MongoClient('mongodb://admin:123456@mongo-3:28010/?readPreference=secondary')
print c

print c.nodes
print c.database_names()
