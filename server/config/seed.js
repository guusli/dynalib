/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Book = require('../api/book/book.model');
var User = require('../api/user/user.model');
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
    ISBN: '960-3232-059-0',
    authors: "Author 1",
    numberInStock: 5
  }, {
    title: 'NodeJS Book',
    ISBN: '960-32-059-0',
    authors: "Author 2",
    numberInStock: 2
  }, {
    title: 'Angular Book',
    ISBN: '321-425-059-0',
    authors: "Author 1",
    numberInStock: 1
  }, {
    title: 'CSS For Pros',
    ISBN: '12-425-059-0',
    authors: "Author 2",
    numberInStock: 2
  }, {
    title: 'Java For Dummies',
    ISBN: '65-425-059-0',
    authors: "Author 1",
    numberInStock: 5
  });
}



function seedLoans() {
  var book, user;
  Book.find({}).exec().then(function(books) {
    var booksIds = _.map(books, function(book) {
      return book._id
    });

    User.findOneAndUpdate({name: /Gustav/}, {loans: [booksIds[0]] } , {}, function(err, person) {
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
  .then(seedUsers)
  .then(seedBooks)
  .then(seedLoans);

//sleep(1000,testPop);

var book = User.findOne({
  name: /Mongo/
});