const express = require('express')
const { request } = require('https')
const router= express.Router()

const {signup, signin, signout, requireSignin}= require('../controllers/auth')
const { runValidation } = require('../validators')
const { userSignupValidator } = require('../validators/auth')

router.post('/signup', userSignupValidator, runValidation, signup)
router.post('/signin', signin)
router.get('/signout',signout)

router.get('/secret',requireSignin, (req,res)=>{
    res.json({
        message: 'Hii Secret'
    })
})
module.exports = router