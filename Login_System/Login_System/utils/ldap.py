from ldap3 import Server, Connection, ALL, SUBTREE
from cryptography.fernet import Fernet
import json

class LDAPauth:

    def __init__(self, ip):
        with open('config.json') as json_file:  
            data = json.load(json_file)
        self.server = Server(ip)
        f = Fernet(data['key'].encode())
        self.token=data['token'].encode()
        self.password = f.decrypt(self.token).decode("utf-8")
        self.user_dn = 'CN=Shubham Shubham 62165320,OU=India,OU=Users,OU=UserAccounts,DC=nsn-intra,DC=net'
        self.base_dn = "DC=nsn-intra,DC=net"
        self.conn = Connection(self.server, user=self.user_dn, password=self.password)
        print(self.conn.bind())

    def LDAPsearch(self, username):
        x= self.conn.search(search_base = self.base_dn,
                search_filter = '(&(objectclass=user)(sAMAccountName='+username+'))',
                search_scope = SUBTREE,
                attributes = ['cn', 'givenName']
                )
        try:
            print(self.conn.response)
            dn = self.conn.response[0]['dn']
            return dn  # get the dn name for a user 
        except:
            return "unsuccessful"

    def LDAPauthenticate(self, dn, password):
        server = Server('ldap://10.130.208.11:389')
        conn = Connection(server, user=dn, password=password)
        if conn.bind() == True:
            conn.unbind()
            return "successful"
        else:
            return "unsuccessful"