const handlerFactory = require('../Controllers/handlersFactory.Controller');
const ApiError = require('../utils/apiError');
const Category = require('../Models/category.model');



// Create a Category
exports.createCategory = handlerFactory.createOne(Category);

// Get all Category
exports.getAllCategory = handlerFactory.getAll(Category);

// Get a single Category
exports.getCategory = handlerFactory.getOne(Category);





// Delete a Category by ID
exports.deleteCategoryById = async (req, res, next) => {
  try {
    const result = await Category.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'Category with this id does not exist'
      });
    }
    res.status(200).json({
      status: "success",
      message: 'Category deleted successfully',
      data: result
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "fail",
      error: "Could not delete the category"
    });
  }
}

// Update a Category by ID
exports.updateCategoryById = async (req, res, next) => {
  try {
    const result = await Category.updateOne(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'Category with this id does not exist'
      });
    }
    res.status(200).json({
      status: "success",
      message: 'Category updated successfully',
      data: result
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "fail",
      error: "Could not update the category"
    });
  }
}