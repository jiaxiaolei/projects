# -*-coding:utf8-*-

from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World! \n\t--Jia Xiaolei'

from flask import render_template

@app.errorhandler(404)
def page_not_found(error):
    return render_template('test.html'), 404
    

@app.route('/test1')
def test1():
    return 'test1 --Jia Xiaolei'

#NOTE: TODO: 2个URL指向同一个地址？？
@app.route('/test2')
def test2():
    return 'test2 --Jia Xiaolei'


# @app.route('/test2')
# def test22222():
#     return 'test2222 --Jia Xiaolei'



@app.route('/test2/')
def test22():
    return 'test22 with slash --Jia Xiaolei'


if __name__ == '__main__':
    # app.run()
    app.run(debug=True)
