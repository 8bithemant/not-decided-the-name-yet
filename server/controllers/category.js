const Category = require('../models/Category')
const {errorHandler} =require('.././helpers/dbErrorHandler')
const slugify = require('slugify')

exports.create= (req,res)=>{


    console.log(req.body)
    const {name, about,cover}= req.body
    let slug= slugify(name).toLowerCase()
    let category = new Category({name, slug, cover, about})
    category.save((err, data)=>{
        if(err){
            return res.status(400).json({
                error : errorHandler(err)
            })
        }
        res.json(data)
    })
}


exports.list=(req,res)=>{
    Category.find({}).exec(
        (err, data)=>{
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(data)
        }
    )
}

exports.update=(req,res)=>{
    const slug= req.params.slug.toLowerCase()

    Category.findOne({slug}).exec((err, oldCategory)=>{

        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        let oldSlug = oldCategory.slug
        const {name, about, cover} = req.body;
        oldCategory.slug= oldSlug

        if(name){
            oldCategory.name= name
        }

        if(about){
            oldCategory.about= about
        }

        if(cover){
            oldCategory.cover= cover
        }

        oldCategory.save((err, result)=>{
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }

            res.json(result)
        })
        
    })
}


exports.remove =(req,res)=>{
    const slug= req.params.slug.toLowerCase()

    Category.findOneAndRemove({slug}).exec((err, data)=>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message:' Category Deleted Successfully'
        }) 
    })
}