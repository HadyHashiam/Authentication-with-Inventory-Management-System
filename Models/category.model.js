const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please provide a category name'],
    lowercase: true,
    unique: true
  },
  description: String,
  imageUrl: {
    type: String,
    defaultValue: null,
  }
}, {
  timestamps: true
})

const Category = mongoose.model('category', categorySchema);

module.exports = Category;