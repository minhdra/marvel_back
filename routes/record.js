const express = require('express');
const recordRoutes = express.Router();
const dbo = require('../db/conn');
const ObjectId = require('mongodb').ObjectId;
recordRoutes.route('/movies').get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection('movies')
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = recordRoutes;
