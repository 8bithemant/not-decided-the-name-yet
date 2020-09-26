const Blog= require('../models/Blog')
const Category= require('../models/Category')
const Tag = require('../models/Tag')
const slugify= require('slugify')
const stripHtml= require('string-strip-html')
const _ = require('lodash')
const fs = require('fs')
const {smartTrim}= require('../helpers/blog')

exports.create=(req,res)=>{

}