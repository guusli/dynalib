'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  googleId: String,
  loans : [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

module.exports = mongoose.model('User', UserSchema);