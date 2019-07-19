from pymongo import MongoClient
from werkzeug.utils import secure_filename
from flask import request, send_from_directory
import json
import pandas as pd
import re
import os
class mongotemplateop:

    def __init__(self, databasename, ip, port):
        """
        Initialisation of the class
        """
        self.root = "C:/Users/shubham/Desktop/Use Cases With Interns/Login System"
        self.databasename = databasename
        self.client = MongoClient(ip, port)
        self.collection_name = "template_info"
        self.db = self.client[self.databasename]
        print(self.db)

    def create_template_record(self, username, template):
        """Creates folders for templates if they do not exist
            Parameters  : 
                username: username of the user
                template: template name which must be unique

            Returns:

        """
        templates = self.db[self.collection_name].find_one({"username": username, "template_name": template})
        
        if templates is None:
            record = {
                "username" : username,
                "template_name" : template,
                "data_source": [],
                "images": [],             # change
                "text_files": []          # change
                      }
            self.db[self.collection_name].insert_one(record)
            return "success"

        else:
            return "exists"

    def create_template(self, username, template, root, data):
        try:
            filepath = root +'/user/'+ username + '/templates/' + template + ".json"
            print(filepath)
            
            with open(filepath, 'w') as fp:
                json.dump(data, fp)
            return "success"
        except:
            return "error"
        



    def update_template_data(self,username, template, data):
        """Updates data source for a template in the database
           Parameter: 
              username: username of the user
              template : template currently in use
              data: Name of the data source. Must be unique for a template
            
            Return : 
                Status  : success or error

        """
        myquery = {"username": username, "template_name": template}
        test = {"username": username, "template_name": template, "data_source": data}
        check = self.db[self.collection_name].find_one(test)
        if check is None:
            newvalues = {"$push": {"data_source": data}}
            try:
                self.db[self.collection_name].update_one(myquery, newvalues)
                return "success"
            except:
                return "error"
        else:
            return "exists"

    # change
    def update_template_image(self,username, template, image):
        myquery = {"username": username, "template_name": template}
        test = {"username": username, "template_name": template, "images" : image}
        check = self.db[self.collection_name].find_one(test)
        if check is None:
            newvalues = {"$push": {"images": image}}
            try:
                self.db[self.collection_name].update_one(myquery, newvalues)
                return "success"
            except:
                return "error"
        return "imagesexists"


    # change
    def update_template_text(self,username, template, text):
        myquery = {"username": username, "template_name": template}
        test = {"username": username, "template_name": template, "text_files": text}
        check = self.db[self.collection_name].find_one(test)
        if check is None:
            newvalues = {"$push": {"text_files": text}}
            try:
                self.db[self.collection_name].update_one(myquery, newvalues)
                return "success"
            except:
                return "error"
        else:
            return "exists"

    def get_templates(self, username):
        s = self.db[self.collection_name].find({"username": username}, {"template_name": 1, '_id': 0})
        arr = []

        for i in s:
            arr.append(i["template_name"])
        
        return arr


    def get_datasource(self, username, template):     #datasets corresponding to a template
        myquery = {"username": username, "template_name": template}
        myaction = {"data_source": 1, '_id': 0}
        datasource = self.db[self.collection_name].find(myquery, myaction)
        return datasource


    
    def delete_template(self, username, template, root):
        try:
            path = root + "/user/" + username + "/templates/" + template + ".json"
            print(path)
            os.remove(path)
            return "success"
        except:
            return "error"


    def delete_template_record(self, username, template, root):
        try:
            query = {"username": username, "template_name": template}
            self.db[self.collection_name].delete_one(query)
            return "success"
        except:
            return "error"


'''
        filepath = root + username + '/template/' + template + template_name + '.json'
        with open(filepath, 'w') as fp:
            json.dump(data, fp)
'''



#abc = mongotemplateop('reporting_template', 'localhost', 27017)
#a = abc.create_template("anurag", "template3")
#b = abc.update_template("anurag", "template3", "data2")
#c = abc.get_templates("anurags")
#d = abc.get_datasource("anurag", "template1")
#e = abc.get_datasets("anurag")
