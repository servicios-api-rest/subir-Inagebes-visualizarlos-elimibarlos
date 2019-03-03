'use strict'

const mongoose = require('mongoose');

mongoose.connect('mongodb://192.168.99.100:27017/pinterestDB',{useNewUrlParser: true},(err,res)=>{
    if(err)throw err
    console.log('Conexion a la base de datos establecida: 192.168.99.100:27017')
});

module.exports=mongoose
