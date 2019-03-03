'use strict'

const express= require('express');

//utilizando multer
const multer = require('multer');
const fs = require('fs');
const { unlink } = require('fs-extra')
const path = require('path')


const route = express.Router();
const connect = require('../../../database/connect')
const Img = require('../../../database/img')
const Image = require('../../../database/image')


//::::::::::::::::metodos de peticion GET, POST, PUT, DELETE:::::::::::::::::

//message de bienvenida de la api


route.get('/api',(req, res, next)=>{
    res.send({mesaage:'servidor api-rest corriendo'})
})


//::::::::::::::::::subir arvhisvos al servidor--(IMG)::::::::::::::::::::::::::::::::::::::

     //mi¿uestra todas la imagenes en la base de datos
route.get('/', async (req, res)=>{

    const images = await Image.find()

    console.log(images)

    res.render('index', {images})
})


route.get('/upload', (req, res)=>{
  

  res.render('upload')
})


route.post('/upload',async (req, res)=>{
  console.log(req.file);

  const image = new Image();
  image.title = req.body.title
  image.description =req.body.description
  image.filename = req.body.filename
  image.path = '/img/uploads/'+ req.file.filename
  image.originalname = req.file.originalname
  image.mimetype = req.file.mimetype
  image.size = req.file.size

  await image.save();

  res.redirect('/')

})

route.get('/image/:id', async(req, res)=>{
  const { id } = req.params     //// con destructuración
  const image = await Image.findById(id);
  console.log(image)
  res.render('profile',{ image })
   
})

route.get('/image/:id/delete', async (req, res)=>{
  const id_image = req.params.id
  console.log(id_image)

  const image= await Image.findByIdAndDelete(id_image)
  console.log(image.path)
  await unlink(path.resolve('./public'+image.path))

  res.redirect('/')
})


//:::::::::::::::::::::::::::::::::::end subir archivos al servidor::::::::::::::::::::::::::::::::::

module.exports = route;

