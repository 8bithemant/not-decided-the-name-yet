const express = require('express')

const router = require.Router();

const {create} = require('../controllers/blog')
router.post('/blog',requireSignin, adminMiddleware, create)

module.exports = router;