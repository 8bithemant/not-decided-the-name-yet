const express= require('express')
const router=express.Router()


const {create, list, remove, read, update} = require('../controllers/category')
const {runValidation}= require('../validators')
const {categoryCreateValidator }= require('../validators/category')
const { requireSignin, adminMiddleware } = require('../controllers/auth')

router.post('/category',categoryCreateValidator, runValidation, requireSignin, adminMiddleware,create)
router.get('/category', list)
router.put('/category/:slug', requireSignin, adminMiddleware, update)
// router.get('/category/:slug', read);
router.delete('/category/:slug', requireSignin, adminMiddleware, remove)
module.exports= router