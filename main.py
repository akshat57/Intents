#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask, request, render_template, url_for, redirect, session
from flask import send_from_directory
import json
import os
from datetime import datetime
import subprocess
import time
import random
from helper_functions import *

app = Flask(__name__)
app.config['SECRET_KEY'] = 'yabadabadoooo'

#Login Page
@app.route('/', methods=['GET', 'POST'])
def index():
    session['parent_directory'] = os.getcwd()
    session['context'] = ['नमस्ते! मैं आपकी क्या सहायता करूं ?']

    return render_template('index.html', myvariable='', login='')


@app.route('/logintest', methods=['POST'])
def logintest():
    login_id = request.form['login_id']
    print('----------entered login test----------')
    #check if username exists. If yes, go to recording. If no, show error and redirect to 
    login_exists = check_login(session['parent_directory'], login_id)

    if login_exists:
        prompt = 'Welcome back : ' + login_id
    else:
        prompt = 'New login ID created : ' + login_id

    return render_template('index.html', myvariable=prompt, login=login_id)


@app.route("/recording/<name>", methods=['GET', 'POST'])
def recording(name):

    if request.method == "POST":
        print(request.method , 'FOR RECORDING')

        #Needs to be hardcoded
        parent_directory = session['parent_directory']

        #Find to current conversation directory
        go_to_conversation(parent_directory, name)

        f = request.files['audio_data']

        #Save audio file
        now = datetime.now()
        filename = now.strftime("%Y%m%d_%H%M%S") + '.wav'
        with open(filename, 'wb') as audio:
            f.save(audio)
        print('file uploaded successfully')

        sample_rate = request.form['sample_rate']
        #Contact dialogflow agent
        query, response, intent, success = talk_to_agent(parent_directory, filename, sample_rate)

        #Display on website
        response_file_name = "r" + str(random.randint(0,10000)) + ".txt"
        response_location = parent_directory + '/templates/'
        file = open( response_location + response_file_name,"w")
        file.write('What You Said : ' + query + '<br>' + "Bank's Response : " + response)
        file.close()


        if success:
            file = open( 'conversation_list.txt', 'a')
            file.write(filename + '\n')
            file.close()
            session['context'].append(response)
            session['context'] = session['context']
            

        os.chdir(parent_directory)

        print(response)
    
        return render_template(response_file_name, name=name, response='Hi')

    else:
        print(request.method, 'FOR RECORDING')


        #Create a new conversation directory. It is the working directory. 
        session['working_directory'] = start_conversation(name)
        print('Working directory:', session['working_directory'])

        response = 'Bank : ' + session['context'][0]
        return render_template("index_recording.html", name=name, response=response)



@app.route('/decide_repeat', methods=['POST'])
def process():
    input_message = request.form['messagebox']

    print(input_message)
    file = open( "message.txt","a")
    file.write(input_message)
    file.close()

    return render_template('index_decide_repeat.html')


@app.route('/repeat', methods=['GET', 'POST'])
def repeat():
    print(len(session['context']), session['context'])
    os.chdir(session['working_directory'])
    filenames = get_file_names(session['working_directory'])
    print(filenames)

    try:
        f = request.files['audio_data']
        #Save audio file
        now = datetime.now()
        filename = now.strftime("%Y%m%d_%H%M%S") + '.wav'
        with open(filename, 'wb') as audio:
            f.save(audio)
        print('file uploaded successfully')

        file = open( "rerecord.txt","a")
        file.write(filename + '\n')
        file.close()

    except:
        print('first entry', request.method)
        language = request.form['languages']
        if language == 'Other':
            language = request.form['otherlanguage']

        file = open( "second_language.txt","w")
        file.write(language)
        file.close()

    print(session['context'])
    os.chdir(session['parent_directory'])
    return render_template('index_repeat.html', filenames=filenames, length=len(filenames), context=session['context'])


@app.route('/play_audio/<path:filename>')
def download_file(filename):
    return send_from_directory(session['working_directory'], filename)



if __name__ == "__main__":
    app.run(debug=True, port=5007)

'''@app.route("/", methods=['POST', 'GET'])
def index():
    if request.method == "POST":
        f = request.files['audio_data']
        with open('audio.wav', 'wb') as audio:
            f.save(audio)
        print('file uploaded successfully')

        return render_template('index.html', request="POST")
    else:
        return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)'''
