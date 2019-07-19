from pymongo import MongoClient
import json
import pandas as pd
import re

class mongodbopdata:

    def __init__(self, databasename, ip, port):
        self.databasename = databasename
        self.client = MongoClient(ip, port)
        self.collection_name = None
        self.db = self.client[self.databasename]
        print(self.db)

    

    def upload_data(self, collection_name, df):
        try:
            cols = []
            for i in df.columns:
                cols.append(re.sub('[^a-zA-Z0-9]', '_', i))
            df.columns = cols
            self.collection_name = collection_name
            records = json.loads(df.T.to_json()).values()
            self.db[self.collection_name].insert(records)
            return [collection_name]
        except:
            return "error"


    def get_data_keys(self, collection_name):
        document = self.db[collection_name].find_one()
        #print(document.keys())
        return list(document.keys())

    def get_data(self, collection_name, key_name):
        s = self.db[collection_name].find({}, {key_name: 1, '_id': 0})
        arr = []
        for i in s:
            arr.append(i[key_name])
        print(arr)
        return arr



if __name__=='__main__':
    xx = mongodbopdata('reporting_data', 'localhost', 27017)
    df = pd.read_excel(r"C:\Users\shubham\Desktop\Reporting_Backend\inputs\Pre Post_3G VIL_09062019.xlsx", sheet_name="numHsPdschCodes" )


    print(xx)
    xx.get_collections()
    keys = xx.get_data_keys('data1')
    arr = xx.get_data('data1', keys[1])
    #xx.upload_data('data1', df)

