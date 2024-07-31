const express = require('express');
const router = express.Router();
const stockController = require('../Controllers/stock.controller')

const authService = require('../Controllers/auth.Controller');

router.use(authService.protect); // Protect all routes


router.route('/')
  .post(authService.protect, authService.allowedTo('admin'), stockController.createStock)
  .get(stockController.getAllStocks)
router.route('/:id')
  .get(stockController.getStock)
  .delete(authService.protect, authService.allowedTo('admin'), stockController.deleteStockById)
  .patch(authService.protect, authService.allowedTo('admin'), stockController.updateStockById)
module.exports = router;