const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const characterSchema = new Schema(
  {
    hero: { type: String, required: true },
    name: { type: String, required: true },
    overview: { type: String },
    card_thumb: { type: String },
    portrait_url: { type: String },
    background_url: { type: String },
    story_moments: { type: Array },
    abilities: { type: Array },
    movies: { type: Array },
    bio: { type: String },
    masthead: { type: String },
    id: { type: Number, required: true },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Character = mongoose.model('characters', characterSchema);

module.exports = Character;
