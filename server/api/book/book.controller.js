'use strict';

var _ = require('lodash');
var Book = require('./book.model');
var User = require('../user/user.model');

// Get list of books
exports.index = function(req, res) {
  Book.find(function (err, books) {
    if(err) { return handleError(res, err); }
    return res.json(200, books);
  });
};

// Get a single book
exports.show = function(req, res) {

  Book.findOne({_id: req.params.id }).lean().exec().then(function(books) {
      User.find({loans: books._id},function(err,docs){
          console.log("=============");
          books.loaners = docs;
          console.log(books)
      })
    });

  Book.findOne({_id: req.params.id }).lean().exec().then(function (book) {
    if(!book) { return res.send(404); }

    User.find({loans: book._id},function(err, users){
      if(err) { return handleError(res, err); }
      if(!users) { return res.send(404); }

      book.loaners = users;
      return res.json(book);
    });


  });
};


// Creates a new book in the DB.
exports.create = function(req, res) {
  Book.create(req.body, function(err, book) {
    if(err) { return handleError(res, err); }
    return res.json(201, book);
  });
};

// Updates an existing book in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Book.findById(req.params.id, function (err, book) {
    if (err) { return handleError(res, err); }
    if(!book) { return res.send(404); }
    var updated = _.merge(book, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, book);
    });
  });
};

// Deletes a book from the DB.
exports.destroy = function(req, res) {
  Book.findById(req.params.id, function (err, book) {
    if(err) { return handleError(res, err); }
    if(!book) { return res.send(404); }
    book.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}