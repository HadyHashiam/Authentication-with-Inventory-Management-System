const handlerFactory = require('../Controllers/handlersFactory.Controller');
const ApiError = require('../utils/apiError');
const Store = require('../models/store.model')

// Create a Store
exports.createStore = handlerFactory.createOne(Store);

// Get all Stores
exports.getAllStores = handlerFactory.getAll(Store);

// Get a single Store
exports.getStore = handlerFactory.getOne(Store);

// Delete a Store by ID
exports.deleteStoreById = async (req, res, next) => {
  try {
    const result = await Store.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'Store with this id does not exist'
      });
    }
    res.status(200).json({
      status: "success",
      message: 'Store deleted successfully',
      data: result
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "could not delete the store"
    });
  }
}

// Update a Store by ID
exports.updateStoreById = async (req, res, next) => {
  try {
    const result = await Store.updateOne(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true }
    );
    if (result.nModified === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'Store with this id does not exist or no changes made'
      });
    }
    res.status(200).json({
      status: "success",
      message: 'Store updated successfully',
      data: result
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "could not update the store"
    });
  }
}
