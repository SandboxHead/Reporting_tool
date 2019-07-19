from pymongo import MongoClient
import os


class mongouserop:

    def __init__(self, databasename, ip, port):
        self.databasename = databasename
        self.client = MongoClient(ip, port)
        self.collection_name = "user_info"
        self.db = self.client[self.databasename]
        print(self.db)

    def get_all_users(self, username):
        users = self.db[self.collection_name].find({}, {"username": username, '_id': 0})
        return users
    
    def get_collections(self):
        collections = self.db.collection_names(include_system_collections=False)
        return collections


    def create_user(self, username):
        users = self.db[self.collection_name].find_one({"username": username})
        print(users)
        if users is None:
            record = {
                "username" : username,
                "templates" : [],
                "data_source": [],
                "images":[],
                "text_files":[]
                      }

            self.db[self.collection_name].insert(record)
            return "User successfully created"

        else:
            return "User exists"


    def update_user(self,username='shubham', template="template1", data="data1"):
        myquery = {"username": username}
        newvalues = {"$push": {"templates": template, "data_source": data}}
        try:
            self.db[self.collection_name].update_one(myquery, newvalues)
            return "success"
        except:
            return "an error occurred"

    def get_data(self, username):
        data = self.db[self.collection_name].find({"username": username}, {"data_source": 1, '_id': 0})
        print(data)
        arr=[]
        for i in data:
            arr.extend(i['data_source'])
        return arr

    def get_templates(self, username):
        data = self.db[self.collection_name].find({"username": username}, {"templates": 1, '_id': 0})
        print(data)
        arr=[]
        for i in data:
            arr.extend(i['templates'])
        return arr

    def get_images(self, username):
        data = self.db[self.collection_name].find({"username": username}, {"images": 1, '_id': 0})
        print(data)
        arr=[]
        for i in data:
            arr.extend(i['images'])
        return arr
    
    def get_textfiles(self, username):
        data = self.db[self.collection_name].find({"username": username}, {"text_files": 1, '_id': 0})
        print(data)
        arr=[]
        for i in data:
            arr.extend(i['text_files'])
        return arr

    def update_user_template(self, username, template):
        myquery = {"username": username}
        newvalues = {"$push": {"templates": template}}
        test = {"username": username, "templates": template}
        check = self.db[self.collection_name].find_one(test)
        if check is None:
            try:
                self.db[self.collection_name].update_one(myquery, newvalues)
                return "success"
            except:
                return "error"
        else:
            return "exists"



    def update_user_data(self,username, data):
        myquery = {"username": username}
        newvalues = {"$push": {"data_source": data}}
        test = {"username": username, "data_source": data}
        check = self.db[self.collection_name].find_one(test)
        if check is None:
            try:
                self.db[self.collection_name].update_one(myquery, newvalues)
                return "success"
            except:
                return "an error occurred"
        else:
            return "data exists"


    # change
    def update_user_image(self, username, image):
        myquery = {"username": username}
        newvalues = {"$push": {"images": image}}
        test = {"username": username, "images": image}
        check = self.db[self.collection_name].find_one(test)
        if check is None:
            try:
                self.db[self.collection_name].update_one(myquery, newvalues)
                return "success"
            except:
                return "an error occurred"
        else:
            return "image exists"


    # change
    def update_user_text(self, username, text):
        myquery = {"username": username}
        newvalues = {"$push": {"text_files": text}}
        test = {"username": username, "text_files": text}
        check = self.db[self.collection_name].find_one(test)
        if check is None:
            try:
                self.db[self.collection_name].update_one(myquery, newvalues)
                return "success"
            except:
                return "an error occurred"
        else:
            return "file exists"



    def delete_usertemplate_info(self, username, template):
        try:
            y = self.db[self.collection_name].find({"username": username}, {"templates": 1, '_id': 0})
            arr = []
            for i in y:
                arr.extend(i["templates"])

            print(arr)
            arr.remove(template)
            myquery = {"username": username}
            newvalues = {"$pull": {"templates": template}}
            
            self.db[self.collection_name].update(myquery, newvalues)
            return "success"
        except:
            return "error"


    def user_directory_creation(self, username, root):
        filepath = root+ "/user/" + username
        if not os.path.exists(filepath):
            os.makedirs(filepath)
            os.makedirs(filepath + "/templates")
            os.makedirs(filepath + "/images")
            os.makedirs(filepath + "/textfiles")

        


        
        








