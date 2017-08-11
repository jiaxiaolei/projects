#!/usr/bin/env python
# coding=utf-8


"""
MongoEngine ReplicaSet Connection fails on stepdown
http://javascript.wekeepcoding.com/article/12506880/MongoEngine+ReplicaSet+Connection+fails+on+stepdown
"""

from flask import Flask

#from mongoengine import connect
from flask_mongoengine import MongoEngine

import os

db = MongoEngine()
app = Flask(__name__)

class TestDoc(db.Document):
    texto = db.StringField()

class ProductionConfig: 
   

    def get_conn_data(self): 
        conn = {
                #'host':"mongodb://testdbuser:testdbpass@flip.mongolab.com:53117,flop.mongolab.com:54117/testdb?replicaSet=rs-flip-flop",
                'host':"mongodb://testdbuser:testdbpass#flip.mongolab.com:53117,flop.mongolab.com:54117/testdb?replicaSet=rs-flip-flop",
                'replicaSet': 'rs-flip-flop'

            } 
        return conn 
        

import time 
app.config['MONGODB_SETTINGS'] = ProductionConfig().get_conn_data() 
db.init_app(app)


if __name__ == '__main__': 
    #with app.test_client() as c: 
    #    while True: 
    #        time.sleep(1) 

    print(TestDoc.objects().count())
    TestDoc(texto="1").save()
