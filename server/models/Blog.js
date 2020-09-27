const mongoose = require('mongoose');
const {ObjectId}= mongoose.Schema;

const blogSchema = new mongoose.Schema({
    
    title:{
        type: String,
        trim:true,
        min: 3,
        max: 160,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        index: true
    },
    body: {
        type: {},
        required: true,
        min: 2,
        max: 2000000
    },
    excerpt: {
        type: String,
        max: 1000
    },
    mtitle: {
        type: String
    },
    mdesc: {
        type: String
    },
    cover:{
        type: String
    },
    categories:[{type: ObjectId, ref: 'Category', required: true, max:1}],
    tags: [{type: ObjectId, ref: 'Tag', required: true, max:4}],
    postedBy:{
        type: ObjectId,
        ref: 'User'
    },
}, {timestamps: true})

module.exports= mongoose.model('Blog', blogSchema)