const express= require('express')
const router=express.Router()


const {create, list, remove, read} = require('../controllers/tag')
const {runValidation}= require('../validators')
const {categoryCreateValidator }= require('../validators/tag')
const { requireSignin, adminMiddleware } = require('../controllers/auth')

router.post('/tag',categoryCreateValidator, runValidation, requireSignin, adminMiddleware,create)
router.get('/tag', list)
// router.get('/category/:slug', read);
router.delete('/tag/:slug', requireSignin, adminMiddleware, remove)
module.exports= router