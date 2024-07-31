const handlerFactory = require('../Controllers/handlersFactory.Controller');
const ApiError = require('../utils/apiError');
const Stock = require('../Models/stock.model')

// Create a Stock
exports.createStock = handlerFactory.createOne(Stock);

// Get all Stocks
exports.getAllStocks = handlerFactory.getAll(Stock);

// Get a single Stock
exports.getStock = handlerFactory.getOne(Stock);

// Delete a Stock by ID
exports.deleteStockById = async (req, res, next) => {
	try {
		const result = await Stock.deleteOne({ _id: req.params.id });
		if (result.deletedCount === 0) {
			return res.status(404).json({
				status: 'fail',
				message: 'Stock with this id does not exist'
			});
		}
		res.status(200).json({
			status: "success",
			message: 'Stock deleted successfully',
			data: result
		});
	} catch (error) {
		res.status(400).json({
			status: "fail",
			error: "could not delete the stock"
		});
	}
}

// Update a Stock by ID
exports.updateStockById = async (req, res, next) => {
	try {
		const result = await Stock.updateOne(
			{ _id: req.params.id },
			{ $set: req.body },
			{ runValidators: true }
		);
		if (result.nModified === 0) {
			return res.status(404).json({
				status: 'fail',
				message: 'Stock with this id does not exist or no changes made'
			});
		}
		res.status(200).json({
			status: "success",
			message: 'Stock updated successfully',
			data: result
		});
	} catch (error) {
		res.status(400).json({
			status: "fail",
			error: "could not update the stock"
		});
	}
}
