const express= require('express');
const morgan= require('morgan');
const cors = require('cors');
const cookieParser= require('cookie-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// APP
const app= express();

// Importing Routes
const authRoutes= require('./routes/auth')
const categoryRoutes = require('./routes/category')
const tagRoutes = require('./routes/tag')
const blogRoutes= require('./routes/blog')
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


// Routes
app.use('/api', authRoutes)
app.use('/api',categoryRoutes)
app.use('/api', tagRoutes)
app.use('/api', blogRoutes)
const port= process.env.PORT;


app.listen(port, ()=>{
    console.log(`${port} Running Live`);

    console.table(`lets roll in ${port}`)
})