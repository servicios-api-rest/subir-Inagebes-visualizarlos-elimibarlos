'use strict'

const express = require('express');
const bodyParser =require('body-parser');
const morgan = require('morgan');
const multer = require('multer')
const uuid = require('uuid/v4');
const path =require('path')
const { format } = require('timeago.js')



const app=express();
const port=process.env.PORT || 5030;
app.set('view engine','ejs')

//middlewares
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json())
       //configuracion de multer----------------------------
const staorage = multer.diskStorage({
    destination: path.join(__dirname,'./public/img/uploads' ),
    filename: (req, file, cb, filename)=>{
        cb(null, uuid() + path.extname(file.originalname))
    }
})

app.use(multer({
    storage:staorage
}).single('image'))
    //-----end configuration multer-----------------

// Global variables
app.use((req, res, next)=>{
    app.locals.format = format;
    next()
})


//Routes
const services = require('./routes/api/v0.1/services')
    //services
app.use('/api',services);
app.use(services)

//Static file  -->para que las imagenes sean accedidas por el navegador
app.use(express.static(path.join(__dirname, 'public')));


app.listen(port,()=>{
    console.log(`Api-rest linstening o port:http://localhost:${port}`)
})

module.exports= app;
