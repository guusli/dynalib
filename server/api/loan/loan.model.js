'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LoanSchema = new Schema({
  user : { type: Schema.Types.ObjectId, ref: 'User' },
  book : { type: Schema.Types.ObjectId, ref: 'Book' },
  loanDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Loan', LoanSchema);