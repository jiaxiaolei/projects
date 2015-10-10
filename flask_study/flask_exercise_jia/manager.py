
from flask import Flask
from flask import abort
from flask.ext.script import Manager

print '----name----', __name__

app = Flask('a')
manager = Manager(app)

#app = Flask(__name__)
@app.route("/")
def hello():    
    #abort(504)
    #abort(404)
    return "Hello World!", 400
 
if __name__ == "__main__":
    #app.run(port=5050, debug=True)
    manager.run()
