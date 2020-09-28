const express = require('express');
const router = express.Router();

const {requireSignin, adminMiddleware} =require('../controllers/auth')
const {create, read, remove,update,listAllBlogsCatTags} = require('../controllers/blog');


router.post('/blog',requireSignin, adminMiddleware, create)
router.get('/blog/:slug',read )
router.get('/blogs', listAllBlogsCatTags)
router.delete('/blog/:slug', requireSignin, adminMiddleware, remove)
router.put('/blog/:slug', requireSignin ,adminMiddleware, update)
module.exports = router;