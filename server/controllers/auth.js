const mongoose = require('mongoose')
const crypto= require('crypto')

const userSchema = new mongoose.Schema({
    
    userName:{
        type: String,
        trim:true,
        required: true,
        max: 32,
        unique: true,
        index: true,
        lowercase: true
    },

    name:{
        type: String,
        trim: true,
        required: true,
        max: 32
    },

    email:{
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase:true, 
    },

    hashed_password:{
        type: String
    },

    role:{
        type: Number,
        default:0
    },

    salt: String,

    about:{
        type: String
    },

    profile_photo:{
        type: String,
        default: ''
    },

    resetPasswordLink:{
        data: String,
        default: ''
    }
}, {timestamps: true})