/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Book = require('../api/book/book.model');
var User = require('../api/user/user.model');
var Loan = require('../api/loan/loan.model');
var _ = require('lodash');


//Book.find({}).remove();


var user;
var query = User.where({
  name: /Gustav/
});

function seedUsers() {
  User.create({
    name: 'Gustav Lindberg',
    googleId: '104788871386310670334',
    loans: []
  });
}

function seedBooks() {
  Book.create({
    title: 'MongoDB Book',
    ISBN: '1'
  }, {
    title: 'NodeJS Book',
    ISBN: '2'
  }, {
    title: 'Angular Book',
    ISBN: '3'
  }, {
    title: 'CSS For Pros',
    ISBN: '4'
  }, {
    title: 'Java For Dummies',
    ISBN: '5'
  });
}



function seedLoans() {
  var book, user;
  Book.find({}).exec().then(function(books) {
    var booksIds = _.map(books, function(book) {
      return book._id
    });

    User.findOneAndUpdate({name: /Gustav/}, {loans: booksIds } , {}, function(err, person) {
      if (err) {
        console.log('got an error');
      }

      // at this point person is null.
    });
  });

}

function sleep(millis, callback) {
  setTimeout(function() {
    callback();
  }, millis);
}

function testPop() {
  User
    .findOne()
    .populate('loans')
    .exec(function(err, story) {
      if (err) return handleError(err);

      console.log(story);
    });

    Book.findOne({title: /Mongo/}).lean().exec().then(function(books) {
      User.find({loans: books._id},function(err,docs){
          console.log("=============");
          books.loaners = docs;
          console.log(books)
      })
    });
}

User.find({}).remove().exec()
  .then(Book.find({}).remove().exec())
  .then(Loan.find({}).remove().exec())
  .then(seedUsers)
  .then(seedBooks)
  .then(seedLoans);

//sleep(1000,testPop);

var book = User.findOne({
  name: /Mongo/
});