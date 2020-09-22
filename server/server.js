const express= require('express');
const morgan= require('morgan');
const cors = require('cors');
const cookieParser= require('cookie-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// APP

const app= express();

// DB
console.log(process.env.DATABASE_LOCAL)
mongoose.connect(process.env.DATABASE_LOCAL,{
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=>{
    console.log("Hii DE'v'-------------------------------DB----DB----DB----DB--->")
})

// middleware

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

// CORS setup
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development'){
    app.use(cors({origin: `${process.env.CLIENT_URL}`}));
}

app.get('/',(req,res)=>{
    res.send('Hii Dev');
})

const port= process.env.PORT;


app.listen(port, ()=>{
    console.log(`${port} Running Live`);
})