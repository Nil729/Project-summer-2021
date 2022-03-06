# https://github.com/aarnhub/instagram-scraper-python
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from time import sleep
from selenium.webdriver.common.alert import Alert
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import StaleElementReferenceException
from selenium.common.exceptions import TimeoutException
import time
import os
import datetime
from webdriver_manager.chrome import ChromeDriverManager
import unittest
from database import get_users # Crec que ara si que está ben importat!!! falta provar ho i crec que es podria fer from srcPY.database import get_Users
from DB_get import get_databaseIG, username_BD
 
#import pymongo

# module unittest  info chek that url: https://unipython.com/selenium-testing-test-suite-unittest/ 

class SearchText(unittest.TestCase):
    def setUp(self):
        self.options= webdriver.ChromeOptions()
        self.options.add_argument('--ignore-certificate-errors')
        self.options.add_argument('--user-agent="Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16D57"')
        self.driver= webdriver.Chrome(ChromeDriverManager().install())
        self.driver.get('https://www.instagram.com/accounts/login/')
        self.data1 = []
        self.data2 = []
        self.data3 = []
        #self.database = database()
        

    def test_loginInstagram(self):
        
        account = "rodrigo_07wuw"   #account from
        #page = "followers"  # from following or followers

        yourusername = "rodrigo_07wuw" #your IG username
        yourpassword = "rodrigo12345"  #your IG password
        sleep(3)
        WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//button[contains(.,'Accept')]"))).click()
        sleep(1)
        username_input = self.driver.find_element_by_css_selector("input[name='username']")
        password_input = self.driver.find_element_by_css_selector("input[name='password']")
        username_input.send_keys(yourusername)
        password_input.send_keys(yourpassword)
        login_button = self.driver.find_element_by_xpath("//button[@type='submit']")
        login_button.click()
        WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//button[contains(.,'Not Now')]"))).click()
        sleep(5)
        #WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//button[contains(.,'Not Now')]"))).click()
        #sleep(5)
        get_databaseIG()

        
        username_BD = ['_hassan_sh']
        for i in username_BD:
            sleep(2)
            imput_serch = self.driver.get('https://www.instagram.com/%s' % i)
            IG= self.driver.find_element_by_xpath('//h2[@class="_7UhW9       fKFbl yUEEX   KV-D4              fDxYl     "]').text# comprovar si existeix el ig
            print(IG)
            followers= self.driver.find_element_by_xpath('//ul/li[2]').text# comprovar si a pogut agafar la dada ex: si la ha agafat qeu la variable passi a ture
            print(followers)
            posts = self.driver.find_element_by_xpath('//ul/li[1]').text# comprovar si a pogut agafar la dada ex: si la ha agafat qeu la variable passi a ture
            print(posts)
            self.data1.append(IG)
            self.data2.append(followers)
            self.data3.append(posts)

            print('IG: ', IG, 'followers: ',followers)

            #self.get_Users()
        get_users(self.data1,self.data2,self.data3)#amb a questa funció podem accedir al document database 


    def tearDown(self):
        self.driver.quit()
        
if __name__ == "__main__":
    unittest.main()
#inst = SearchText()
#inst.setUp()

