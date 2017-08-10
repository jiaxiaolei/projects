
from mongoengine import connect
from mongoengine import Document 
from mongoengine import StringField 

"""

app.config['MONGODB_SETTINGS'] = {
        'host': 'mongodb://mpc:mpc@mongo-1:28010,mongo-2:28010/mpc',
        }
"""

connect('mpc', host='mongodb://mpc:mpc@mongo-1:28010,mongo-2:28010,mongo-3:28010/mpc')

class User(Document):
    title = StringField(required=True, max_length=200)

print User.objects.count()

