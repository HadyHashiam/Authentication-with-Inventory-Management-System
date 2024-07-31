const router = require("express").Router();
const categoryController = require('../Controllers/category.controller');
const { protect, allowedTo } = require('../Controllers/auth.Controller');

const authService = require('../Controllers/auth.Controller');

router.use(authService.protect); // Protect all routes



router.route('/')
  .post(authService.protect, authService.allowedTo('admin'), categoryController.createCategory)
  .get(categoryController.getAllCategory)
router.route('/:id')
  .get(categoryController.getCategory)
  .delete(authService.protect, authService.allowedTo('admin'), categoryController.deleteCategoryById)
  .patch(authService.protect, authService.allowedTo('admin'), categoryController.updateCategoryById)
module.exports = router;