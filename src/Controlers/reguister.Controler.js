import Reguistro from '../models/Reguistro'
import jwt from 'jsonwebtoken'
import config from '../config'
import { contentType } from 'express/lib/response';
//import passport from 'passport'


export const postSingup = async(req, res) => { 
    const {fullName, userName, email, password} = req.body;
    const errors =  []
    
    if(fullName.length <= 0){
        errors.push({text: 'The full name field is required'});
    }
    if(userName.length <= 0 || typeof userName !== 'string'){
        errors.push({text: 'The user name field is required'});
    }
    if(validateEmail(email) === false){
        console.log(validateEmail(email))
        errors.push({text: 'Invalid Email'});
    }
    if (password.length < 8) {
        errors.push({text: 'password must be at least 4 characters'});
    }
    if(errors.length > 0){
        console.log(errors.length);
        res.render('users/singup', {errors, fullName, userName, email, password});
    }else{
        //res.json({fullName, userName, email, password});
        const username = await Reguistro.findOne({userName})
        if (username) { // Comprova si el userName ja existeix a la base de dades (falta mostrar per pantalla canviar lo del console.log)
            console.log('The username is it inserted'); 
            errors.push({text: 'The username is it inserted'});
        }else{
            const reguistro = new Reguistro({
                fullName,
                userName,
                email,
                password
            });
    
            reguistro.password = await reguistro.encryptPassword(reguistro.password);
            await reguistro.save();
    
            
            const token = jwt.sign( {id: reguistro._id, password: reguistro.password}, config.mongodbURL,{ // nomes diem que converteixi el token del id
                expiresIn: 60 * 60 * 24
            })

            res.cookie("x-access-token", token);
            res.redirect('/me');
        }

    }
};
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


export const postlogin = async (req, res) =>{

    const {userName, password} = req.body;
    const user = await Reguistro.findOne({ userName });
    
    const errorsLogin =  []
    if (!user) {
        console.log('el usuario no exeiste');
        errorsLogin.push({text: 'Username not found'});
        //return res.status(404).send("The name doesn't exists");
        
    }
    try{
        
        const validPassword = await user.matchPassword(
            password,
            user.password
        );
        
        if (!validPassword) {
            console.log('la contraseña es incorrecta');
            errorsLogin.push({text: 'Ivalid password'});
            //return res.status(401).send({ auth: false, token: null });
        }

    }catch (error){
        errorsLogin.push({text: 'Invalid password'});
    }
    
    if (errorsLogin.length > 0) {

        return res.render('users/login', {errorsLogin, userName, password});
        
    }else {
        // fer un if que si una variable sigui igual a turedons que pirmer faci el token i llavors passi a fales i faci el redirect.
        const token = jwt.sign({ id: user._id }, config.mongodbURL, {
            expiresIn: 60 * 60 * 24,
        });
        res.cookie("x-access-token", token);
        res.redirect('/me');
    }
    //res.json({auth: true, token })
};


export const getMe = async (req, res) =>{
    //console.log(decoded)// ens retorna el objecta amb el id
    //const user = await Reguistro.findById(req.userId, {_id: 0, fullName: 0, email: 0});
    res.render('static/me')
};