const express = require('express');

const path = require('path');
const fs = require('fs')

const router = express.Router();

const ProductController = require("../controllers/ProductController");


const isAuth = require('../middleware/is-auth');


const multer = require('multer')



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });

  const upload = multer({storage: storage, limits: {
      fileSize: 1024 * 1024 * 5
  }});
  
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(new Error("Image Upload Problem"), false);
    }
  };


router.post('/api/add-products', upload.single('productImage'),ProductController.addProduct);

router.get('/api/products', ProductController.getProduct);

router.get('/api/edit-product/:parentId', ProductController.getEditProduct);

router.post('/api/edit-product', upload.single('productImage'), ProductController.postEditProduct);

router.post('/api/delete-product', isAuth, ProductController.postDeleteProduct);

module.exports = router;