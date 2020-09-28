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
        const {firstName,lastName, email, password, rePassword} = req.body;
        if(password !== rePassword){
            return res.status(400).json({
                error: 'Both the Password Dont Macth'
            })
        }
        let username= shortId.generate()
        let profile= `${process.env.CLIENT_URL}/profile/${username}`;
        let newUser = new User({username, firstName, lastName, email, password, profile})

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
    const {email, password}= req.body

    // Check, if user exists?

    User.findOne({email}).exec((err, user)=>{
        if(err || !user){
            return res.status(400).json({
                error: `No User Found With that email, please make sure to Sign-Up first!` 
            })
        }

        // Authenticate

        if(!user.authenticate(password)){
            return res.status(400).json({
                error: 'Email Pass dose not match'
            })
        }

        // Generate JWT= Json Web Token 

        const token= jwt.sign({_id: user._id},process.env.JWT_SECRET, {expiresIn: '1d'})

        res.cookie('token', token, {expiresIn: '1d'})

        const {_id, username, firstName, lastName, email, role} =user

        return res.json({
            token, user:{
                _id, username, firstName, lastName, role, email
            }
        })
    })
}




exports.signout=(req,res)=>{
    res.clearCookie('token')
    res.json({
        message: "Successfully Signed Out"
    })
}



exports.requireSignin =expressJwt({
    secret: process.env.JWT_SECRET, algorithms: ['HS256']
})

exports.authMiddleware = (req,res,next)=>{
    const authUserId = req.user._id
    User.findById({_id: adminUserId})
        .exec((err, user)=>{
            if(err || !user){
                return res.status(400).json({
                    error: 'User Not Found'
                })
            }
            req.profile= user;

            next()
        })
}

exports.adminMiddleware=(req,res,next)=>{
    const adminUserId= req.user._id;

    User.findById({_id: adminUserId})
        .exec((err, user)=>{
            if(err || !user){
                return res.status(400).json({
                    error: 'User Not Found'
                })
            }

            if(user.role!== 1){
                return res.status(400).json({
                    error: 'Admin Resource'
                })
            }

            res.profile = user

            next()
        })
}


