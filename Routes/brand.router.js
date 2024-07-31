const express = require('express');
const router = express.Router();
const brandController = require('../Controllers/brand.controller')


const authService = require('../Controllers/auth.Controller');

router.use(authService.protect); // Protect all routes



router.route('/')
  .post(authService.protect, authService.allowedTo('admin'), brandController.createBrand)
  .get(brandController.getAllBrands)
router.route('/:id')
  .get(brandController.getBrand)
  .delete(authService.protect, authService.allowedTo('admin'), brandController.deleteBrandById)
  .patch(authService.protect, authService.allowedTo('admin'), brandController.updateBrandById)
module.exports = router;