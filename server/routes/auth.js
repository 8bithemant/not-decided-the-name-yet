const express = require('express')
const { request } = require('https')
const router= express.Router()

const {signup}= require('../controllers/auth')

router.post('/signup', signup)

module.exports = router