from flask import Flask, flash, redirect, render_template, request, session, abort, url_for, send_from_directory, jsonify
from forms import RegistrationForm, LoginForm
from utils.mongouserop import mongouserop
from utils.mongotemplateop import mongotemplateop
from utils.mongodbop import mongodbopdata
from utils.ldap import LDAPauth
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import pandas as pd
import pymongo
import json
import os
import random
import string




root = os.getcwd()
with open(root+'/config.json') as json_file:  
            data = json.load(json_file)


ldapip = data['ldap_ip']
ldap = LDAPauth(ldapip)

userdatabase = data['userdatabase']
ip = 'localhost'
port = 27017
mongouser = mongouserop(userdatabase, ip, port)

datadatabase = data['datadatabase']
ip = 'localhost'
port = 27017
mongodata = mongodbopdata(datadatabase, ip, port)

templatedatabase = data['templatedatabase']
ip = 'localhost'
port = 27017
mongotemplate = mongotemplateop(templatedatabase, ip, port)


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.secret_key = os.urandom(24)

sessions = {}

@app.route("/")
def index():
    return render_template("index.html")


# @app.route('/register', methods = ['POST', 'GET'])
# def register():
#     form = RegistrationForm()
#     if form.validate_on_submit():
#         flash(f'Account Created for {form.username.data} !', 'success')
#         return redirect(url_for('index'))
#     return render_template('register.html', title='Register', form=form)


# @app.route("/login", methods = ['GET','POST'])
# def login():
#     """
#     Logins the user on the basis of username and password.
#     Uses LDAp authentication
#     After login it creates necessary directories for the user if it doesnot exist.
#     """
#     form = LoginForm()
#     if form.validate_on_submit():
#         user_response = ldap.LDAPsearch(form.username.data) 
#         if  user_response == "unsuccessful":
#             jsonify({"status":""})
#         else:
#             if ldap.LPADauthenticate(user_response, form.password.data) == "successful":
#                 flash("You have been successfully logged in", 'success')
#                 session['logged_in'] = True
#                 session['username'] = form.username.data
#                 mongouser.user_directory_creation(session['username'], root)
#                 mongouser.create_user(session['username'])
#                 return redirect(url_for('index'))
#             else:
#                 flash('login unsuccessful. Please check username and password', 'danger')
#     return render_template('login.html', title='Login', form=form)

def id_generator(size=16, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

def new_token():
    global sessions
    temp = ''

    while(True):
        temp = id_generator(16)
        if(temp in sessions):
            continue
        else:
            return temp

    return temp

@app.route("/login", methods = ['GET','POST'])
def login():
    global sessions
    print('login')
    data = request.json

    user_response = ldap.LDAPsearch(data['username']) 
    if  user_response == "unsuccessful":
        print('login unsuccessful. Incorrect username', 'danger')
        return jsonify({'status' : 'NoUser'})
    else:
        if ldap.LDAPauthenticate(user_response, data['password']) == "successful":
            print("You have been successfully logged in", 'success')

            session['logged_in'] = True
            session['username'] = data['username']
            session['status'] = 'success'
            session.permanent = True
            mongouser.user_directory_creation(session['username'], root)
            mongouser.create_user(session['username'])
            print(session)
            tok = new_token()
            sessions[tok] = data['username']
            response = jsonify({'status' : 'success', 'token' : tok})
            response.headers.add('Access-Control-Allow-Methods',
                         'GET, POST, OPTIONS, PUT, PATCH, DELETE')
            response.headers.add('Access-Control-Allow-Headers',
                         "Origin, X-Requested-With, Content-Type, Accept, x-auth")
            response.headers.add('token', tok)
            return response
        else:
            
            print('login unsuccessful. Please check username and password', 'danger')
            return jsonify({'status' : 'FalsePassword'})


        # if mongouser.login(form.username.data, form.password.data) is not None:
        #     flash("You have been successfully logged in", 'success')
        #     session['logged_in'] = True
        #     session['username']='shubham'
        #     return redirect(url_for('index'))
        # else:
        #     flash('login unsuccessful. Please check email and password', 'danger')



###### Template operations ##################################

@app.route("/get_template/<username>", methods = ['GET','POST'])
def get_templates(username):
    global sessions
    
    """
    Returns list of all templates corresponding to a username.
    """
    token = request.headers['Auth']
    print(sessions, token)

    try:
        if (token in sessions) and (sessions[token] == username):
            templates = mongouser.get_templates(username)
            print(templates)
            return jsonify({"collections": templates})
        else:
            return render_template("index.html")
    except:
        return render_template("index.html")


@app.route("/create_template/<username>/<template>", methods = ['GET', 'POST'])
def create_template(username, template):
    """
    Creates a new template for the user.
    Takes username , template name and template configurations as arguments.
    return the status (if file exists or created successfully)
    """
    global sessions
    data = request.json
    print(data)
    print(session)
    token = request.headers['Auth']
    if (token in sessions) and (sessions[token] == username):
        create1 = mongotemplate.create_template_record(username, template)
        create2 = mongotemplate.create_template(username, template, root, data)
        create3 = mongouser.update_user_template(username, template)
        if create1 == "success" and create2 == "success" and create3 == "success":
            return jsonify({"status": "success"})
        elif create1 == "exists":
            return jsonify({"status": "exists"})
        else:
            return jsonify({"status": "success"})
    else:
        return jsonify({"status":"error"})
    

@app.route("/delete_template/<username>/<template>", methods = ['GET','POST'])
def delete_template(username, template):
    global sessions
    token = request.headers['Auth']

    try:
        if (token in sessions) and (sessions[token] == username):
            status1 = mongotemplate.delete_template(username, template, root)
            status2 = mongotemplate.delete_template_record(username, template, root)
            status3 = mongouser.delete_usertemplate_info(username, template)
            if status1 and status2 and status3:
                return jsonify({'status':'success'})
            else:
                return jsonify({'status':'error'})
        else:
            return render_template("index.html")
    except:
        return render_template("index.html")


@app.route("/update_template/<username>/<template>", methods = ['GET','POST'])
def update_template(username, template):
    global sessions
    token = request.headers['Auth']
    data = request.json
    print(data)
    try:
        if (token in sessions) and (sessions[token] == username):
            status = mongotemplate.create_template(username, template, root, data)
            return jsonify({"status":status})
        else:
            return render_template("index.html")
    except:
        return render_template("index.html")


@app.route("/return_template/<username>/<template>", methods=['GET','POST'])
def return_template(username, template):
    global sessions
    token = request.headers['Auth']

    path = root + "/user/"+username+"/templates/"+template+".json"
    with open(path) as json_file:  
            data = json.load(json_file)
    print(data)
    return data


# @app.route("/rename_template/<username>/<template_old>/<template_new>", methods = ['GET','POST'])
# def rename_template(username, template_old, template_new):
#     try:
#         if (token in sessions) and (sessions[token] == username):
#             status = 


######## Template Operations End     ################################################





######## Operations on Data ####################################################


@app.route("/get_images/<username>")
def get_images(username):
    global sessions
    token = request.headers['Auth']

    try:
        if (token in sessions) and (sessions[token] == username):
            images = mongouser.get_images(username)
            return jsonify({'status':images})
        else:
            return render_template("index.html")
    except:
        return render_template("index.html")




@app.route("/imageupload/<username>/<template>", methods = ['GET', 'POST'])
def upload_image(username, template):
    
    """
    Uploads image to a folder for every user.
    Takes username and templatename as arguments
    """
    global sessions
    token = request.headers['Auth']

    try:
        if (token in sessions) and (sessions[token] == username):
            UPLOAD_FOLDER = root +'/user/'+ username + '/images/'
            print("--------------------------------------------")
            print(UPLOAD_FOLDER)
            ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])
            app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

            if request.method == 'POST':
                image = request.files['file']
                print("----------------------------------------------")
                print(image)
                filename = secure_filename(image.filename)
                print(filename)
                if filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS:
                    path = UPLOAD_FOLDER + filename
                    print(path)
                    if not os.path.exists(path):
                        print("inside")
                        image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                        updater1 = mongouser.update_user_image(username, filename)
                        updater2 = mongotemplate.update_template_image(username, template, filename)
                        return jsonify({"status":"success"})
                        #return "successfully saved"
                    else:
                        return jsonify({"status":"exists"})
                else:
                    return jsonify({"status":"file format not allowed"})
        else:
            return render_template("index.html")
    except:
        return render_template("index.html")


@app.route("/return_image/<username>/<image>", methods=['GET', 'POST'])
def return_image(username, image):
    global sessions
    token = request.headers['Auth']
    try:
        if (token in sessions) and (sessions[token] == username):

            ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])
            UPLOAD_FOLDER = root +'/user/'+ username + '/images/'
            app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
            return send_from_directory(UPLOAD_FOLDER, image)
        else:
            return render_template("index.html")
    except:
        return render_template("index.html")






@app.route("/upload_data/<username>/<template>", methods=['GET','POST'])
#@cross_origin()
def upload_data(username, template):
    """
    Uploads csv or excel files to the database that user wants to use.
    Takes the username and template as argument.
    Returns the list of all the datanames uploaded corresponding to a user . 
    """
    global sessions
    # token = request.headers['Auth']
    try:
        collection_names = mongouser.get_data(username)
        print(collection_names)
        file = request.files['file']
        print(file.filename)
        file_name = file.filename
        if file_name.split(".")[-1] == 'csv':
            df = pd.read_csv(file)
            print(df.head())
        elif file_name.split(".")[-1] == 'xlsx':
            df = pd.read_excel(file)
            print(df.head())
        else:
            print("no file")
        print(file_name)
        collection_name = username+"_"+file_name.split(".")[0]
        print(collection_name)
        print(collection_names)
        if collection_name in collection_names:
            return jsonify({'status' : "Already Exist"})
        status = mongodata.upload_data(collection_name, df)
        mongouser.update_user_data(username, collection_name)
        mongotemplate.update_template_data(username, template, collection_name)
        # status = mongouser.update_user('shubham', 'template1', file_name)
        return jsonify({'status' : 'Success', "collections" : status})
        # else:
        #     return render_template("index.html")
    except:
        print('Error')
        return render_template("index.html")



@app.route("/get_keys/<username>/<collections>", methods = ['GET', 'POST'])
def get_keys(username, collections):
    global sessions
    token = request.headers['Auth']
    try:
        if (token in sessions) and (sessions[token] == username):
            collection_name = username+"_"+collections
            keys = mongodata.get_data_keys(collection_name)
            print(keys)
            return jsonify({"keys": keys})
        else:
            return render_template("index.html")
    except:
        return render_template("index.html")


@app.route("/get_data/<username>/<collection>/<key>", methods = ['GET', 'POST'])
def get_data(username, collection, key):
    # try:
    global sessions
    token = request.headers['Auth']
    try:
        if (token in sessions) and (sessions[token] == username):
            result = mongodata.get_data(username+"_"+collection, key)
            return jsonify({'data': result})
            # except:
                # return jsonify({'data': "error"})
        else:
            return render_template("index.html")
    except:
        return render_template("index.html")


@app.route("/get_user_data/<username>", methods = ['GET','POST'])
def get_user_data(username):
    global sessions
    token = request.headers['Auth']
    print(token)
    try:
        if (token in sessions) and (sessions[token] == username):
            print('INside')
            data_source = mongouser.get_data(username)
            print(data_source)
            out = [data.split('_')[1] for data in data_source]
            return jsonify({'status':out})
        else:
            return render_template("index.html")
    except:
        return render_template("index.html")



@app.route("/get_user_text_datafiles/<username>", methods = ['GET','POST'])
def get_user_text_datafiles(username):
    global sessions
    token = request.headers['Auth']
    try:
        if (token in sessions) and (sessions[token] == username):
            textfiles = mongouser.get_textfiles(username)
            return jsonify({"textfiles":textfiles})
        else:
            return render_template("index.html")
    except:
        return render_template("index.html")

@app.route("/upload_textfiles/<username>/<template>", methods = ['GET','POST'])
def upload_textfiles(username, template):
    global sessions
    token = request.headers['Auth']
    try:
        if (token in sessions) and (sessions[token] == username):
            UPLOAD_FOLDER = root +'/user/'+ username + '/textfiles/'
            print(UPLOAD_FOLDER)
            ALLOWED_EXTENSIONS = set(['txt'])
            app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

            if request.method == 'POST':
                textfile = request.files['file']    
                filename = secure_filename(textfile.filename)
                print(filename)
                if filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS:
                    path = UPLOAD_FOLDER + filename
                    print(path)
                    if not os.path.exists(path):
                        textfile.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                        updater1 = mongouser.update_user_text(username, filename)
                        updater2 = mongotemplate.update_template_text(username, template, filename)
                        
                        return jsonify({"status":"success"})
                        #return "successfully saved"
                    else:
                        return jsonify({"status":"exists"})
                else:
                    return jsonify({"status":"file format not allowed"})
        else:
            return render_template("index.html")
    except:
        return render_template("index.html")


@app.route("/get_user_text_data/<username>/<template>/<data>", methods = ['GET','POST'])
def get_user_text_data(username, template, data):
    global sessions
    token = request.headers['Auth']
    try:
        if (token in sessions) and (sessions[token] == username):
            path = root+"/user/"+username+"/textfiles/"+data+".txt"
            file = open(path,mode='r')
            # read all lines at once
            data = file.read()
            return jsonify({'data':data})
        else:
            return render_template("index.html")
    except:
        return render_template("index.html")





@app.route("/upload")
def upload():
    global sessions
    token = request.headers['Auth']
    try:
        if (token in sessions) and (sessions[token] == username):
            return render_template('upload.html')
        else:
            return render_template("index.html")
    except:
        return render_template("index.html")










###### Data Operations ############################

@app.route("/update_data/<username>/<template>/<data>", methods = ['GET', 'POST'])
def update_data(username, template, data):
    global sessions
    token = request.headers['Auth']
    try:
        if (token in sessions) and (sessions[token] == username):
            updater = mongotemplate.update_template_data(username, template, data)
            print(updater)
            return jsonify({"status" : updater})
        else:
            return render_template("index.html")
    except:
        return render_template("index.html")


@app.route("/update/<username>/<template>/<image>", methods = ['GET', 'POST'])
def update_image(username, template, image):
    global sessions
    token = request.headers['Auth']
    try:
        if (token in sessions) and (sessions[token] == username):
            updater = mongotemplate.update_template_image(username, template, image)
            print(updater)
            return jsonify({"status" : updater})
        else:
            return render_template("index.html")
    except:
        return render_template("index.html")


@app.route("/update_text/<username>/<template>/<text>", methods = ['GET', 'POST'])
def update_text(username, template, text):
    global sessions
    token = request.headers['Auth']
    try:
        if (token in sessions) and (sessions[token] == username):
            updater1 = mongotemplate.update_template_text(username, template, text)
            updater2 = mongouser.update_user_t(username, text)
            print(updater)
            return jsonify({"status" : updater})
        else:
            return render_template("index.html")
    except:
        return render_template("index.html")


# @app.route("/<username>/get_template_name", methods = ['GET', 'POST'])
# def get(username):
#     try:
#         if (token in sessions) and (sessions[token] == username):
#             get_t = mongotemplate.get_template_name(username)
#             print(get_t)
#             return jsonify({'templates': get_t})
#         else:
#             return render_template("index.html")
#     except:
#         return render_template("index.html")


# @app.route("/<username>/<template>/get_source_name", methods = ['GET', 'POST'])
# def source(username, template):
#     get_d = mongotemplate.get_datasource_name(username, template)
#     print(get_d)
#     return jsonify({'source': get_d})


# @app.route("/<username>/update/<template>", methods = ['GET', 'POST'])
# def update(username, template):
#     updater = mongouser.update_user_tem(username, template)
#     print(updater)
#     return jsonify({"status" : updater})


# @app.route("/update/<username>/<data>", methods = ['GET', 'POST'])
# def update(username, data):
#     updater = mongouser.update_user_d(username, data)
#     print(updater)
#     return jsonify({"status" : updater})


# @app.route("/<username>/update/<image>", methods = ['GET', 'POST'])
# def update(username, image):
#     updater = mongouser.update_user_i(username, image)
#     print(updater)
#     return jsonify({"status" : updater})


# @app.route("/<username>/update/<text>", methods = ['GET', 'POST'])
# def update(username, text):
    
#     print(updater)
#     return jsonify({"status" : updater})


# @app.route("/data/<username>", methods = ['GET', 'POST'])
# def dataset(username):
#     data = mongouser.get_datasets_name(username)
#     print(data)
#     return jsonify({'datasets': data})

@app.route("/logout")
def logout():
    global sessions
    token = request.headers['Auth']

    sessions.pop(token)
    return index()




if __name__ == "__main__":
    app.secret_key = 'Helloworld12'
    app.config['SESSION_TYPE'] = 'filesystem'
    app.run()



    