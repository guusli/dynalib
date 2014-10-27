'use strict';

angular.module('dynalibraryApp')
  .factory('bookService', function ($http) {
    
    var bookService = {};

    bookService.getAllBooks = function () {
      return $http.get('/api/books');
    };

    bookService.getBook = function(id) {
      return $http.get('/api/books/' + id );
    };

    bookService.lendBook = function(id) {
      return $http.post('/api/users/loans/' + id );
    };

    bookService.returnBook = function(id) {
      return $http.delete('/api/users/loans/' + id );
    };

    return bookService;

  });
