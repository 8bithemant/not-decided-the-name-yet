const express = require('express')
const { request } = require('https')
const router= express.Router()

const {signup}= request('../controllers/auth')

router.post('/signup', signup)

module.exports = router