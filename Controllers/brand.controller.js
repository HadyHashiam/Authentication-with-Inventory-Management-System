const handlerFactory = require('../Controllers/handlersFactory.Controller');
const ApiError = require('../utils/apiError');
const Brand = require('../models/brand.model')

// Create a Brand
exports.createBrand = handlerFactory.createOne(Brand);

// Get all Brand
exports.getAllBrands = handlerFactory.getAll(Brand);

// Get a single Brand
exports.getBrand = handlerFactory.getOne(Brand);




// Delete a Brand by ID
exports.deleteBrandById = async (req, res, next) => {
  try {
    const result = await Brand.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'Brand with this id does not exist'
      });
    }
    res.status(200).json({
      status: "success",
      message: 'Brand deleted successfully',
      data: result
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "fail",
      error: "Could not delete the brand"
    });
  }
}



// Update a Brand by ID
exports.updateBrandById = async (req, res, next) => {
  try {
    const result = await Brand.updateOne(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'Brand with this id does not exist'
      });
    }
    res.status(200).json({
      status: "success",
      message: 'Brand updated successfully',
      data: result
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "fail",
      error: "Could not update the brand"
    });
  }
}