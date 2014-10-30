'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: String,
  ISBN: String,
  authors: String,
  numberInStock: Number,
  imageUrl: String
});

module.exports = mongoose.model('Book', BookSchema);