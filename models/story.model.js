const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const storySchema = new Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String },
    image_url: { type: String, required: true },
    active: { type: Boolean, required: true, default: true }
  },
  {
    timestamps: true,
  }
);

const Story = mongoose.model('stories', storySchema);

module.exports = Story;
