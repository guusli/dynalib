'use strict';

angular.module('dynalibraryApp')
  .controller('MainCtrl', function ($scope, $http, bookService, books) {
    $scope.books = [];


  $scope.books = books;

    $scope.addBook = function(book) {
      debugger;
      $http.post('/api/books/', book)
        .success(function(data) {
            $scope.books.push(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    $scope.lookupBook = function(isbn) {

      $http.get('/googleLookup?isbn=' + isbn)
        .success(function(data) {
            $scope.bookToAdd = data;
            $scope.bookToAdd.isbn = isbn;
            $scope.bookToAdd.imageUrl = data.thumbnail;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

  });
