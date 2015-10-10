# -*- coding:utf8 -*-

from flask import Flask, flash, redirect, render_template, \
     request, url_for

app = Flask(__name__)
#print '-----name----', __name__
app.secret_key = 'some_secret'

@app.route('/')
def index():
    return render_template('test.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    app.logger.info("jiajiajia")
    flash('You were successfully logged in')
    print '-----come into'
    return render_template('test.html', error='jia')
    # error = None
    # if True: #request.method == 'POST':
    #     if request.form['username'] != 'admin' or \
    #        request.form['password'] != 'secret':
    #         error = 'Invalid credentials'
    #     else:
    #         flash('You were successfully logged in')
    #         return redirect(url_for('index'))
    # return render_template('test.html', error=error)

if __name__ == "__main__":
    app.run(debug=True)
