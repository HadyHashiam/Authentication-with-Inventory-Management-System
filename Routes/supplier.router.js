const express = require('express');
const supplierController = require('../Controllers/supplier.controller');

const router = express.Router();
const authService = require('../Controllers/auth.Controller');

router.use(authService.protect); // Protect all routes
router
  .route('/')
  .post(authService.protect, authService.allowedTo('admin'), supplierController.createSupplier)
  .get(supplierController.getAllSuppliers);

router
  .route('/:id')
  .get(supplierController.getSupplier)
  .patch(authService.protect, authService.allowedTo('admin'), supplierController.updateSupplier);

module.exports = router;