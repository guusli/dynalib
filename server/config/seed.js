/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Book = require('../api/book/book.model');


Book.find({}).remove(function() {
  Book.create(
  {
    title : 'MongoDB Book',
  },
  {
    title : 'NodeJS Book',
  },
  {
    title : 'Angular Book',
  },
  {
    title : 'CSS For Pros',
  },
  {
    title : 'Java For Dummies',
  }
)
});