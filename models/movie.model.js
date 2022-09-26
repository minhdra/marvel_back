const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true},
    categories: { type: Array, required: true },
    duration: { type: Number, required: true },
    trailer: { type: String, required: true },
    tagline: { type: String, required: true },
    overview: { type: String, required: true },
    budget: { type: Number, required: true },
    revenue: { type: Number, required: true },
    imdb_id: { type: String, required: true },
    status: { type: String, required: true },
    title: { type: String, required: true },
    companies: { type: Array, required: true },
    release_date: { type: String, required: true },
    backdrop_path: { type: String },
    poster_path: { type: String },
    active: { type: Boolean, required: true, default: true }
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model('movies', movieSchema);

module.exports = Movie;
