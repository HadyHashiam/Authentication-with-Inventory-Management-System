const handlerFactory = require('../Controllers/handlersFactory.Controller');
const ApiError = require('../utils/apiError');
const Product = require('../models/product.model')

// Create a Product
exports.createProduct = handlerFactory.createOne(Product);

// Get all Products
// Get all Products with optional search by name
exports.getAllProducts = async (req, res, next) => {
	try {
		const { search } = req.query;

		// Build query
		let query = {};
		if (search) {
			query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
		}

		// Fetch products with search
		const products = await Product.find(query);
		res.status(200).json({
			status: 'success',
			data: {
				products
			}
		});
	} catch (error) {
		next(new ApiError('Error fetching products', 500));
	}
};

// Get a single Product
exports.getProduct = handlerFactory.getOne(Product);

// Update a Product
exports.updateProduct = async (req, res, next) => {
	try {
		const result = await Product.updateOne(
			{ _id: req.params.id },
			{ $set: req.body },
			{ runValidators: true }
		);
		res.status(200).json({
			status: "success",
			message: "Product update successful",
			data: result
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message: "Data update failed",
			error: error.message
		});
	}
}

// Bulk update Products
exports.bulkProductUpdate = async (req, res, next) => {
	try {
		const products = req.body.ids.map(product =>
			Product.updateOne({ _id: product.id }, product.data)
		);
		const result = await Promise.all(products);
		res.status(200).json({
			status: "success",
			message: "Multiple product update successful",
			data: result
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message: "Multiple product data update failed",
			error: error.message
		});
	}
}

// Delete a Product by ID
exports.deleteProductById = async (req, res, next) => {
	try {
		const result = await Product.deleteOne({ _id: req.params.id });
		if (result.deletedCount === 0) {
			return res.status(404).json({
				status: "fail",
				message: "Product with this id does not exist"
			});
		}
		res.status(200).json({
			status: "success",
			message: "Product delete successful",
			data: result
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message: "Product data delete failed",
			error: error.message
		});
	}
}

// Bulk delete Products
exports.bulkProductDelete = async (req, res, next) => {
	try {
		const result = await Product.deleteMany({ _id: { $in: req.body.ids } });
		if (result.deletedCount === 0) {
			return res.status(404).json({
				status: "fail",
				message: "Products with these ids do not exist"
			});
		}
		res.status(200).json({
			status: "success",
			message: "Multiple product delete successful",
			data: result
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message: "Multiple product data delete failed",
			error: error.message
		});
	}
}

exports.fileUpload = async (req, res, next) => {
	try {
		res.status(200).json(req.files);
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message: "File upload failed",
			error: error.message
		});
	}
}
