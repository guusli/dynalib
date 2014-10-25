'use strict';

angular.module('dynalibraryApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.books = [];

    $http.get('/api/books').success(function(books) {
      $scope.books = books;
    });

    $scope.addBook = function(book) {
      $http.post('/api/books/', book)
        .success(function(data) {
            $scope.books = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

  });
