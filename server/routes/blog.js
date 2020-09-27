const express = require('express');
const router = express.Router();

const {requireSignin, adminMiddleware} =require('../controllers/auth')
const {create, read, remove} = require('../controllers/blog');


router.post('/blog',requireSignin, adminMiddleware, create)
router.get('/blog/:slug',read )
router.delete('/blog/:slug', requireSignin, adminMiddleware, remove)
module.exports = router;