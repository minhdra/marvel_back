const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const abilitySchema = new Schema(
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

const Ability = mongoose.model('abilities', abilitySchema);

module.exports = Ability;
