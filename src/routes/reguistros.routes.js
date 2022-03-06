// fero com ho fa el noi de el tutorial llarg amb la el express session

import {Router} from 'express'

import * as usersContorler from '../Controlers/users.Controler' //ho hem de importar amb * as ja que exportem cada funcio per separat.
import * as reguisterContorler from '../Controlers/reguister.Controler'
import * as statusContorler from '../Controlers/stauts.Controler'
import {authIG} from '../Controlers/verifyIG'
import {authToken,getID_token} from '../Controlers/verifyToken'
const router = Router()

//RUTES
//login
router.get('/', usersContorler.login);
router.post('/login', reguisterContorler.postlogin);
//router.post('/', reguisterContorler.postloginRender);

//SingUp
router.get('/singup', usersContorler.singup);
router.post('/singup', reguisterContorler.postSingup);

//Me
router.get('/me',authToken, reguisterContorler.getMe);//authToken

//User status
router.get('/list',authToken, authIG, statusContorler.findAllUser_status);
router.post('/list', statusContorler.PostUser_status);

//s'ha de crear una altre ruta get per que renderitzi la InstaList o sinos fer que si 

//Request and others --------------------------------------------
router.get('/api/reguistros', usersContorler.findAllUsers);//Al final no servira

router.post('/api/reguistros', usersContorler.PostUser);// això segurament acavara sent la arrel Alfinal no servira (CREC)

///router.get('/stauts/:id', statusContorler.deleteUser_status);

router.get('/api/reguistros/:id', usersContorler.findaUser);

router.delete('/api/reguistros/:id', usersContorler.deleteUser);

export default router;