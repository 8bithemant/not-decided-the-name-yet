const Category = require('../models/Category')
const {errorHandler} =require('.././helpers/dbErrorHandler')
const slugify = require('slugify')

exports.create= (req,res)=>{
    const {name, about,cover}= req.body
    let slug= slugify(name).toLowerCase()
    let category = new Category({name, slug, cover, about})
    category.save((err, data)=>{
        if(err){
            return res.json({
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

// exports.read=(req,res)=>{
//     const slug= req.body.slug.toLowerCase()

//     Category.findOne({slug}).exec((err, catetgory)=>{
//         if(err){
//             return res.status(400).json({
//                 error: errorHandler(err)
//             })
//         }

//         Blog.find({categ})
//     })
// }


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