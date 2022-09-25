const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    active: { type: Boolean, required: true, default: true }
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model('categories', categorySchema);

module.exports = Category;
