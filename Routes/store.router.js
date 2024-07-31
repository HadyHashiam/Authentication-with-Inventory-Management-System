const express = require('express');
const router = express.Router();
const storeController = require('../Controllers/store.controller')

const authService = require('../Controllers/auth.Controller');

router.use(authService.protect); // Protect all routes

router.route('/')
  .post(authService.protect, authService.allowedTo('admin'), storeController.createStore)
  .get(storeController.getAllStores)
router.route('/:id')
  .get(storeController.getStore)
  .delete(authService.protect, authService.allowedTo('admin'), storeController.deleteStoreById)
  .patch(authService.protect, authService.allowedTo('admin'), storeController.updateStoreById)
module.exports = router;