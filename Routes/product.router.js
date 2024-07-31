const express = require('express');
const Product = require('../Controllers/product.controller');
const uploader = require('../Middlewares/uploader');
const router = express.Router();
const authService = require('../Controllers/auth.Controller');

router.use(authService.protect); // Protect all routes



router.route('/file-upload').post(uploader.array('image'), Product.fileUpload)
router.route('/bulk-action')
  .patch(authService.protect, authService.allowedTo('admin'), Product.bulkProductUpdate)
  .delete(authService.protect, authService.allowedTo('admin'), Product.bulkProductDelete)

router.route('/')
  .get(Product.getAllProducts)
  .post(authService.protect, authService.allowedTo('admin'), Product.createProduct) //need to pass verify token and auth middle ware 

router.route('/:id')
  .get(Product.getProduct)
  .patch(authService.protect, authService.allowedTo('admin'), Product.updateProduct)
  .delete(authService.protect, authService.allowedTo('admin'), Product.deleteProductById)


module.exports = router;