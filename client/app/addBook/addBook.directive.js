'use strict';

angular.module('dynalibraryApp')
.directive('addBook', function ($window, $routeParams, $http, auth, session) {
  return {
    templateUrl: 'app/addBook/addBook.html',
    restrict: 'EA',
    link: function (scope, element, attrs) {

      scope.isLoggedIn = auth.isLoggedIn();
      scope.username = session.user.name;
      scope.bookToAdd = {
        numberInStock: 1
      };

      scope.addBook = function(book) {
        $http.post('/api/books/', book)
        .success(function(data) {
          scope.books.push(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
      };

      scope.lookupBook = function(isbn) {

        $http.get('/googleLookup?isbn=' + isbn)
        .success(function(data) {
          scope.bookToAdd = data;
          scope.bookToAdd.isbn = isbn;
          scope.bookToAdd.authors = data.authors.join(", ");
          scope.bookToAdd.imageUrl = data.thumbnail;
          scope.bookToAdd.numberInStock = 1;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
      };

      scope.decreaseStockNumber = function() {
        scope.bookToAdd.numberInStock--;
      };

      scope.increaseStockNumber = function() {
        scope.bookToAdd.numberInStock++;
      };
    }
  };
});