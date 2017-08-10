
from flask_mongoengine import MongoEngine

from flask import Flask


app = Flask(__name__)

#app.config.from_pyfile('the-config.cfg')

#app.config['MONGODB_SETTINGS'] = {
#        'db': 'mpc',
#        'username': 'mpc',
#        'password': 'mpc',
#        'host': 'mongo-2',
#        'port': 28010 
#        }

""" 
# NOTE: connect_settings invalid.
app.config['MONGODB_SETTINGS'] = [
        {
        'db': 'mpc',
        'username': 'mpc',
        'password': 'mpc',
        'host': 'mongo-1',
        'port': 28010 
        },
        {
        'db': 'mpc',
        'username': 'mpc',
        'password': 'mpc',
        'host': 'mongo-2',
        'port': 28010 
        }
        ]
"""

app.config['MONGODB_SETTINGS'] = {
        'host': 'mongodb://mpc:mpc@mongo-1:28010,mongo-2:28010,mongo-3:2801/mpc',
        }


db = MongoEngine(app)

class User(db.Document):
    email = db.StringField(required=True)
    first_name = db.StringField(max_length=50)
    last_name = db.StringField(max_length=50)

print 'filter', User.objects.filter()

