from pymongo import MongoClient
import os

url = os.environ.get('MONGODB_URI')
client = MongoClient(url)

db = client['taskadb']
collectionUserStatus = db['status']


def get_users(ig,f,p):
    #userlist = []
    for string in f:
        f = string.strip(' followers')
        followers= str(f)
    for string in p:
        p = string.strip(' post')
        posts= int(p)
    user = dict(ig= ig[0], followers= followers, posts= posts)
    
    print(user)

    send_data(user)


def send_data(user):
    #si el nom de usuari ja esta insertat que no inserti l'usuari un altre cop un altra cop
    collectionUserStatus.insert_one(user)
    print(db.status.find())

#data= ['nilpinyana', '197 followers', '1 post', 'lia_kng', '666 followers', '0 posts', 'paula.mundo', '547 followers', '8 posts']
'''
col = db.reguistros.find()
for i in col:
    print(i)
'''