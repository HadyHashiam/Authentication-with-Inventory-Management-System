const handlerFactory = require('../Controllers/handlersFactory.Controller');
const ApiError = require('../utils/apiError');
const Supplier = require('../models/supplier.model');

// Create a Supplier
exports.createSupplier = handlerFactory.createOne(Supplier);

// Get all Suppliers with optional search and filter
exports.getAllSuppliers = async (req, res, next) => {
  try {
    const { search, filter } = req.query;

    // Build query
    let query = {};
    if (search) {
      query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
    }
    if (filter) {
      const filterCriteria = JSON.parse(filter);
      query = { ...query, ...filterCriteria };
    }

    // Fetch suppliers with search and filter
    const suppliers = await Supplier.find(query);
    res.status(200).json({
      status: 'success',
      data: {
        suppliers
      }
    });
  } catch (error) {
    next(new ApiError('Error fetching suppliers', 500));
  }
};

// Get a single Supplier
exports.getSupplier = handlerFactory.getOne(Supplier);

// Update a Supplier by ID
exports.updateSupplier = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Supplier.updateOne(
      { _id: id },
      { $set: req.body },
      { runValidators: true }
    );

    if (result.nModified === 0) {
      return res.status(400).json({
        status: 'fail',
        error: "Couldn't update the supplier with this id or no changes made",
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Successfully updated the supplier',
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: 'fail',
      error: "Couldn't update the supplier",
    });
  }
};
