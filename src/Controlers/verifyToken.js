import  jwt from 'jsonwebtoken'
import config from '../config'

export const authToken = (req, res, next)=> {
    const token = req.cookies["x-access-token"]
    if (!token){
        return res.redirect('/') //Faltara que envi a una altra direccio ja que renderiza nomes
    } 
    const decoded =  jwt.verify(token, config.mongodbURL);
    req.userId =  decoded.id;
    res.cookie('user_id',req.userId)
    next();
}


