

//import Reguistro from "../models/Reguistro";
//import passport from "passport";
//const localStrategy = require('passport-local').Strategy

//import jwt from 'jsonwebtoken'

/*
passport.use('signup', new localStrategy({
  usernameField: 'userName',
  passwordField: 'password'
}, async (userName, password, done) => {
  try {
    const user = await Reguistro.create({ userName, password })
    return done(null, user)
  } catch (e) {
    done(e)
  }
}))


passport.use('login', new localStrategy({
  usernameField: 'userName',
  passwordField: 'password',
}, async (userName, password, done) => {
  try {
    const user = await Reguistro.findOne({ userName })
    if (!user) {
      console.log('User not found');
      return done(null, false, { message: 'User not found' })
    }
    
    const validate = await user.matchPassword(password)
    
    if (!validate) {
      console.log('Wrong password');
      return done(null, false, { message: 'Wrong password' })
    }
    console.log('Login successfull');
    return done(null, user, { message: 'Login successfull' })
  } catch (e) {
    return done(e)
  }
}))

*/