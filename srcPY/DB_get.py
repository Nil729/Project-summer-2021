from database import db
from time import sleep
#from ScrapInstagram import valueReguistrosIG

reguistros = db['reguistros']
username_BD = []
def get_databaseIG():
    ig = db.reguistros.find({},{"_id":0,"ig":1,})
    for i in ig:
        username_BD.append(i.get('ig'))

#obtenir nomes el ig

