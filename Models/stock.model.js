const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const Schema = mongoose.Schema;
//stock model schema
const stockSchema = new Schema({
  productId: {
    type: ObjectId,
    required: true,
    ref: "product"
  },
  name: {
    type: String,
    trim: true,
    required: [true, 'Please provide a stock name'],
    unique: true,
    lowercase: true

  },
  description: {
    type: String,
    required: true
  },
  imageUrls: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cant be 0']
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, 'Product quantity cant be 0']
  },
  category: [{
    name: {
      type: String,
      required: true,
    },
    _id: mongoose.Schema.Types.ObjectId,
  }],
  brand: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: ObjectId,
      ref: 'brand',
      required: true
    }
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ['in-stock', 'out-of-stock', 'discontinued'],
      message: "Status cant be out of {VALUE}"
    }
  },
  store: {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide a store name'],
      unique: true,
      lowercase: true

    },
    id: {
      type: ObjectId,
      required: true,
      ref: 'store'
    }
  },
  suppliedBy: {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide a store name'],
      unique: true,
      lowercase: true
    },
    id: {
      type: ObjectId,
      ref: 'supplier'
    }
  }

},

  {
    timestamps: true
  })

const Stock = mongoose.model('stock', stockSchema);

module.exports = Stock;