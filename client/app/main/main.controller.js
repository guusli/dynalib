'use strict';

angular.module('dynalibraryApp')
  .controller('MainCtrl', function ($scope, $http, bookService, books) {
    $scope.books = [];


  $scope.books = books;

    $scope.addBook = function(book) {
      $http.post('/api/books/', book)
        .success(function(data) {
            $scope.books.push(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

  });
