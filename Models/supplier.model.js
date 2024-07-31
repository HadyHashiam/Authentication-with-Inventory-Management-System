const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const supplierSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      lowercase: true,
      maxLength: [100, 'Name is too large'],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },
    brand: {
      name: {
        type: String,
        trim: true,
        required: true,
      },
      id: {
        type: ObjectId,
        required: true,
        ref: 'Brand',
      },
    },
    contactNumber: [
      {
        type: String,
        required: [true, 'Please provide a contact number'],
      },
    ],
    emergencyContactNumber: {
      type: String,
      required: [true, 'Please provide  a emergency contact number'],
    },
    tradeLicenceNumber: {
      type: Number,
      required: [true, 'Please provide your trade licence number'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Please provide your present address'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Please provide your present address'],
    },
    location: {
      type: String,
      required: true,
      lowercase: true,
    },
    imageURL: {
      type: String,
    },
    nationalIdImageURL: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'active',
      enum: ['active', 'inactive'],
    },
  },
  {
    timestamps: true,
  }
);

const Supplier = mongoose.model('supplier', supplierSchema);

module.exports = Supplier;