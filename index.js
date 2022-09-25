const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => console.log('connection successfully'));
// const moviesRoute = require('./routes/movies');

// app.use('/movies', moviesRoute);

const directionRoute = require('./routes/index');
directionRoute(app);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
