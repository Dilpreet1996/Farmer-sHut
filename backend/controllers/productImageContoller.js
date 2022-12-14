const express = require('express');
const route = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
      
    destination(req, file, callback) {
      callback(null, "./ProductImages");
    },
    filename(req, file, callback) {
  
     callback(null, `${file.originalname}`);
    },
  });
  
const upload = multer({ storage });
route.post('/upload', upload.single('image'),(req, res) => {
  console.log(req.file.path)
  
    if(req.file){
      res.status(200).send({mssg:'Image Uploaded',file:req.file})
    }
    else{
      res.status(400).json({mssg:'please select image'})
    }
    
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
});

route.get('/productImage/:id',(req,res,next)=>{
    

    const imageId = req.params.id+'_productImage.jpg';
    var dir = path.join(__dirname,'../ProductImages',imageId)
  
    
    if(fs.existsSync(dir)){
      console.log('exists')
  
     res.sendFile(dir)
  
    }else{
      res.status(400).json({mssg:'notProceed'})
    }
})



module.exports = route
