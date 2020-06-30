from flask import Flask, render_template, request, url_for, redirect

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route('/login_yes', methods=['POST'])
def login_yes():
    login_id = request.form['login_id']
    print(login_id)
    return redirect(url_for('recording', name=login_id))

@app.route('/login_no', methods=['POST'])
def login_no():
    login_id = request.form['login_id']
    print(login_id)
    return render_template('new_id_created.html', login_id=login_id)

@app.route('/recording/<name>', methods=['GET', 'POST'])
def recording(name):
    print('For recording:', name)
    return 'Let us record'

if __name__ == '__main__':
    app.run(debug=True, port=5003)