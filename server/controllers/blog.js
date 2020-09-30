const Blog= require('../models/Blog')
const Category= require('../models/Category')
const Tag = require('../models/Tag')
const slugify= require('slugify')
const stripHtml= require('string-strip-html')
const {smartTrim}= require('../helpers/blog')
const User = require('../models/User')
const { errorHandler } = require('../helpers/dbErrorHandler')


exports.create=(req,res)=>{

    const {title, body, cover, categories,tags}= req.body
    console.log(req.body)
    // console.log(req.body.title)
    if(!tags || tags.length ===0){
        return res.status(400).json({
            error: 'At least one tag is req'
        });
    }
    

    // console.log(req.body)
    let blog = new Blog();
    blog.title= title;
    blog.body= body;
    blog.cover= cover
    blog.excerpt= smartTrim(body, 320, ' ', ' ...');
    blog.slug= slugify(title).toLowerCase() +'-'+ Math.floor(Math.random()*100);
    blog.mtitle= `${title} | ${process.env.APP_NAME}`
    blog.mdesc= stripHtml(body).result.substring(0, 150)
    blog.postedBy =req.user._id;
    let arrayOfCategories= categories && categories.split(",")
    let arrayOfTags= tags && tags.split(",")
    if(arrayOfCategories[1]){
        return res.status(400).json({
            error: 'Single Cat Can be Inserted'
        })
    }
    blog.save(
        (err, result)=>{
            if(err){
                console.log('0')
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }

            Blog.findByIdAndUpdate(result._id, {$push:{categories: arrayOfCategories}}, {new: true}).exec(
                (err, result)=>{
                    if(err){
                        console.log('1')
                        return res.status(400).json({
                            error: err
                        })
                    }else{
                        Blog.findByIdAndUpdate(result._id, {$push:{tags: arrayOfTags}},{new: false}).exec((err,result)=>{
                            if(err){
                                console.log('2')
                                return res.status(400).json({
                                    error: errorHandler(err)
                                })
                            }else{
                                // var newSlug = result.slug +'-'+ result._id;
                                idString = result._id.toString()
                                // console.log(result._id.toString())
                                // console.log(Number(idString.slice(0,8)))
                                idShort= idString.slice(1,10)
                                var newSlug = result.slug + '-'+ idShort
                                Blog.findByIdAndUpdate(result._id, {$set:{slug: newSlug}}).exec(
                                    (err, result)=>{
                                        if(err){
                                            console.log('3')
                                            return res.status(400).json({
                                                error: errorHandler(err)
                                            })
                                        }
                                        Blog.findById(result._id).exec((err, result)=>{
                                            if(err){
                                                console.log('4')
                                                return res.status(400).json({
                                                    error: errorHandler(err)
                                                })
                                            }
                                            const slug= result.slug
                                            result.slug= undefined
                                            res.json({
                                                slug: slug,
                                                result: result
                                            })
                                        })
                                    }
                                )
                                // Blog.findOne({slug}).exec((err, oldBlog)=>{
                                //     if(err){
                                //         return res.status(400).json({
                                //             error: errorHandler(err)
                                //         })
                                //     }else{
                                //         console.log(newSlug, slug)
                                //         oldBlog.slug= newSlug
                                //         oldBlog.save((err, success)=>{
                                //             if(err){
                                //                 return res.status(400).json({
                                //                     error: errorHandler(err)
                                //                 })
                                //             }
                                //             res.json(success)
                                //         })
                                //     }
                                // })
                                
                            }
                        }
                    )}
                }
            )
        }
    )

}

exports.listAllBlogsCatTags=(req,res)=>{
    let limit = req.body.limit ? pareInt(req.body.limit) : 6;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;

    let blogs
    let categories
    let listAllBlogsCatTags

    Blog.find({})
        .populate('categories', '_id name slug')
        .populate('tags','_id name slug')
        .populate('postedBy', '_id name profile username')
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit)
        .select('_id title slug excerpt categories tags postedBy createdAt updatedAt')
        .exec((err, data)=>{
            if(err){
                return res.json({
                    error: errorHandler(err)
                })
            }

            blogs= data

            Category.find({}).exec((err, c)=>{
                if(err){
                    return res.json({
                        error: errorHandler(err)
                    })
                }

                categories = c


                Tag.find({}).exec((err, t)=>{
                    if(err){
                        return res.json({
                            error: errorHandler(err)
                        })
                    }

                    tags= t

                    res.json({blogs, categories, tags, size: blogs.length})
                })
            })
        })
}

exports.read=(req,res)=>{
    const slug= req.params.slug.toLowerCase()

    Blog.findOne({slug})
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name username')
        .select('_id title body slug mtitle mdesc categories tags postedBy createdAt updatedAt')
        .exec((err, data)=>{
            if(err){
                return res.json({
                    error: errorHandler(err)
                })
            }
            res.json(data)
        })
}


exports.remove=(req,res)=>{
    const slug=req.params.slug.toLowerCase()
    Blog.findOneAndRemove({slug}).exec((err, data)=>{
        if(err){
            return res.json({
                error: errorHandler(err)
            })
        }
        console.log(data)
        res.json({
            message : 'Successfully Deleted',
            title: data.title
        })
    })
}

exports.update=(req,res)=>{
    const slug=req.params.slug.toLowerCase()

    Blog.findOne({slug}).exec((err, oldBlog)=>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        const {body, categories, tags, cover, title} = req.body;
        console.log(req.body)
    
        let slugBeforeMerge= oldBlog.slug;
        oldBlog.slug= slugBeforeMerge

        if(title){
            oldBlog.title= title
            console.log(title)
        }

        if(body){
            oldBlog.excerpt = smartTrim(body, 320, ' ', ' ...')
            oldBlog.mdesc = stripHtml(body).result.substring(0,150)
        }

        if(categories){
            oldBlog.categories= categories.split(',')
        }
        
        if(tags){
            oldBlog.tags= tags.split(',')
        }

        if(cover){
            oldBlog.cover = cover
        }

        console.log(oldBlog)
        oldBlog.save((err, result)=>{
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }

            res.json(result)
        })

        
    })
}