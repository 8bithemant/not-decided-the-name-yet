const User = require('../models/User')
const shortId = require('shortid')
const jwt= require('jsonwebtoken')
const expressJwt = require('express-jwt')

const _ = require('lodash')

exports.signup= (req,res)=>{
    User.findOne({email: req.body.email}).exec((err, user)=>{
        if(user){
            return res.status(400).json({
                error: `User Already Exist with this ${req.body.email}`
            })
        }
        const {firstName,lastName, email, password} = req.body;
        let userName= shortId.generate()
        let profile= `${process.env.CLIENT_URL}/profile/${userName}`;
        let newUser = new User({userName, firstName, lastName, email, password, profile})

        newUser.save((err, success)=>{
            if(err){
                return res.status(400).json({
                    error: err
                })
            }
            res.json({
                message: 'Signup Success! Please Move on to Sign-in.'
            })
        })
    })
}










exports.signin=(req,res)=>{

}